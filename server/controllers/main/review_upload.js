const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const { User } = require('../../models');
const Models = initModels(sequelize);
const { userAuth } = require('../../middlewares/authorized/auth');

module.exports = {
  post: async (req, res) => {
    const { user_name, shop_id } = req.params;

    const userInfo = await User.findOne({
      where: {
        user_name: user_name,
      },
    });

    try {
      const imageArr = [];
      // const imageArr = [];

      for (let i = 0; i < req.files.length; i++) {
        let key = req.files[i].key;
        let location = req.files[i].location;
        imageArr.push({ key: key, location: location });
      }
      // const image = {key : req.file.key , src : req.file.location}

      const reviewInfo = Models.Review.findOne({
        where: {
          user_id: userInfo.dataValues.id,
          shop_id: shop_id,
        },
      });

      if (!reviewInfo) {
        await Models.Review.create({
          user_id: userInfo.dataValues.id,
          image_src: JSON.stringify(imageArr),
          shop_id: shop_id,
        });
      } else {
        await Models.Review.update(
          {
            image_src: JSON.stringify(imageArr),
          },
          {
            where: {
              user_id: userInfo.dataValues.id,
              shop_id: shop_id,
            },
          },
        );
      }
      res.status(200).send({ message: '이미지 업로드 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: '서버 에러' });
    }
  },

  delete: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;
      const { review_id } = req.params;
      await Models.Review.destroy({
        where: {
          id: review_id,
        },
      });

      res.status(200).send({ message: '리뷰 삭제 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
