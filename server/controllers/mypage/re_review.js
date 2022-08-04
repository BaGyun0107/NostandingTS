const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const Models = initModels(sequelize);
const { userAuth } = require('../../middlewares/authorized/auth');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { user_name } = req.params;
      //고객 정보 불러오기
      const userInfo2 = await Models.User.findOne({
        include: [
          {
            model: Models.Review,
            as: 'Reviews',
            attributes: [
              'id',
              'shop_id',
              'image_src',
              'score',
              'contents',
              'createdAt',
              'updatedAt',
            ],
          },
          {
            model: Models.Shop,
            as: 'Shops',
            attributes: ['id'],
          },
        ],
        where: { user_name: user_name },
        attributes: ['is_master', 'nickname'],
        order: [[{ model: Models.Review, as: 'Reviews' }, 'id', 'DESC']],
      });
      const is_master = userInfo2.dataValues.is_master;

      if (is_master === 0) {
        // 유저일 때
        let shopArr = [];
        for (let n = 0; n < userInfo2.dataValues.Reviews.length; n++) {
          const shopinfo = await Models.Shop.findOne({
            include: [
              {
                model: Models.User,
                as: 'user',
                attributes: ['shop_name'],
              },
            ],
            where: { id: userInfo2.dataValues.Reviews[n].shop_id },
            attributes: ['id', 'image_src'],
          });
          shopArr.push(shopinfo);
        }

        return res
          .status(200)
          .send({ data: userInfo2, shopArr, message: '정보 전달 완료' });
      }
      if (is_master === 1) {
        // 점주일 때
        const shopReview = await Models.Shop.findOne({
          include: [
            {
              model: Models.User,
              as: 'user',
              where: { user_name: user_name },
              attributes: ['nickname', 'shop_name'],
            },
            {
              model: Models.Review,
              as: 'Reviews',
              attributes: [
                'id',
                'user_id',
                'image_src',
                'score',
                'contents',
                'createdAt',
                'updatedAt',
              ],
              include: [
                {
                  model: Models.User,
                  as: 'user',
                  attributes: ['nickname'],
                },
              ],
            },
            {
              model: Models.ReReview,
              as: 'ReReviews',
              attributes: [
                'id',
                'review_id',
                'contents',
                'createdAt',
                'updatedAt',
              ],
            },
          ],
          attributes: [],
          order: [[{ model: Models.Review, as: 'Reviews' }, 'id', 'DESC']],
        });

        return res
          .status(200)
          .send({ data: shopReview, message: '정보 전달 완료' });
      }
    } catch (err) {
      res.status(500).send({ message: 'Server Error' });
    }
  },
  post: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { review_id, user_name } = req.params;

      const shopInfo = await Models.Shop.findOne({
        include: [
          {
            model: Models.User,
            as: 'user',
            where: { user_name: user_name },
            attributes: ['id'],
          },
        ],
        attributes: ['id'],
      });

      const { contents } = req.body;

      if (!contents) {
        return res.status(400).send({ message: '리뷰 작성은 필수입니다.' });
      }
      await Models.ReReview.create({
        review_id: review_id,
        shop_id: shopInfo.dataValues.id,
        contents: contents,
      });

      await sequelize.transaction(async transaction => {
        // 유저에게 알람 보내기
        const newRe_review = await Models.ReReview.findOne(
          //* 로그인한 고객의 id 찾기
          {
            include: [
              {
                model: Models.Review,
                as: 'review',
                where: { id: review_id },
              },
            ],
            order: [['id', 'DESC']],
          },
          { transaction },
        );

        const curr = new Date();
        const newCurr = curr.toLocaleDateString('ko-kr');
        const updated = curr.setDate(curr.getDate() + 4);

        const masterNotification = await Models.Notification.create(
          //* 고객알림
          {
            user_id: newRe_review.dataValues.review.user_id,
            rereview_id: newRe_review.dataValues.id,
            contents: `${userInfo.dataValues.shop_name} 사장님이 ${newCurr} 고객님의 리뷰에 답글을 작성하셨습니다.`,
            read: 0,
            updated_date: updated,
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
      res.status(500).send({ message: 'Server Error' });
    }
  },
  delete : async(req, res) => {
     
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { rereview_id } = req.params;
  
      await Models.ReReview.destroy({ where: { id: rereview_id } });

      res.status(201).send({ message: '대댓글 삭제 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
