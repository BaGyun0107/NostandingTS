const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const Models = initModels(sequelize);

module.exports = {
  post: async (req, res) => {
    try {
      const { shop_id, user_name } = req.params;

      const userInfo = await Models.User.findOne({
        where: { user_name: user_name },
      });

      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { score, contents } = req.body;

      if (!score || !contents) {
        return res
          .status(400)
          .send({ message: '별점과 리뷰 작성은 필수입니다.' });
      }

      const curr = new Date();

      await Models.Review.create({
        user_id: userInfo.dataValues.id,
        shop_id: shop_id,
        score: score,
        contents: contents,
        createdAt: curr,
      });

      const reviewInfo = await Models.Review.findAll({
        where: { shop_id: shop_id },
      });

      let score_average = 0;
      let average = 0;

      // 별점 모두 더하기
      for (let n = 0; n < reviewInfo.length; n++) {
        average += reviewInfo[n].dataValues.score;
      }
      // 별점 평균 구하기
      score_average = average / reviewInfo.length;

      // let array = JSON.stringify(['a', 'b', 'c']);

      await Models.Shop.update(
        {
          total_views: reviewInfo.length,
          // 소수점 1의 자리로 자르기
          score_average: score_average.toFixed(1),
        },
        { where: { id: shop_id } },
      );

      await sequelize.transaction(async transaction => {
        // 점주에게 알람 보내기
        const newReview = await Models.Review.findOne(
          //* 로그인한 고객의 id 찾기
          {
            include: [
              {
                model: Models.Shop,
                as: 'shop',
                where: { id: shop_id },
                include: {
                  model: Models.User,
                  as: 'user',
                  attribute: ['id', 'shop_name'],
                },
              },
            ],
            order: [['id', 'DESC']],
          },
          { transaction },
        );

        const newCurr = curr.toLocaleDateString('ko-kr');
        const updated = curr.setDate(curr.getDate() + 4);

        const masterNotification = await Models.Notification.create(
          //* 고객알림
          {
            user_id: newReview.dataValues.shop.user.id,
            review_id: newReview.dataValues.id,
            contents: `${userInfo.dataValues.nickname}님께서 ${newCurr} 사장님의 ${newReview.dataValues.shop.user.shop_name} 리뷰를 작성하셨습니다.
고객님의 리뷰에 답글을 작성해주세요.
(답글 쓰기는 예약 이후 3일동안 가능합니다)`,
            read: 0,
            updated_date: updated,
            review: 1,
          },
          { transaction },
        );

        if (!masterNotification) {
          //* 유저 알림이 생성되지 않았다면 오류 메세지
          throw new Error('masterNotification 생성 오류');
        }
      });
      res.status(200).send({ message: '리뷰 작성 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
