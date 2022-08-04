const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const Models = initModels(sequelize);
const { userAuth } = require('../../middlewares/authorized/auth');
const { User, Shop } = require('../../models');

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).send({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { user_name } = req.params;
      const shopInfo = await Models.Shop.findAll({
        include: [
          {
            model: Models.User,
            as: 'user',
            where: { user_name: user_name },
            attributes: ['user_name'],
          },
        ],
        attributes: ['image_src', 'user_id'],
      });

      res.status(200).send({ data: shopInfo, message: '정보 전달 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
  post: async (req, res) => {
    const { user_name } = req.params;

    const userInfo = await User.findOne({
      where: {
        user_name: user_name,
      },
    });

    const shopInfo = await Shop.findOne({
      where: {
        user_id: userInfo.dataValues.id,
      },
    });

    try {
      const image = shopInfo.dataValues.image_src;

      if (image) {
        const imageParse = JSON.parse(image);

        // null이 위차한 인덱스를 찾고
        // 순서대로 넣어준다.
        const nullIdx = [];
        for (let i = 0; i < imageParse.length; i++) {
          if (imageParse[i] === null) {
            nullIdx.push(i);
          }
        }

        for (let i = 0; i < req.files.length; i++) {
          let key = req.files[i].key;
          let location = req.files[i].location;
          const imageEle = { key: key, location: location };
          imageParse[nullIdx[i]] = imageEle;
        }
        // const image = {key : req.file.key , src : req.file.location}

        await Models.Shop.update(
          {
            image_src: JSON.stringify(imageParse),
          },
          {
            where: {
              user_id: userInfo.dataValues.id,
            },
          },
        );
      } else {
        const imageArr = [null, null, null, null];
        // const imageArr = [];

        for (let i = 0; i < req.files.length; i++) {
          let key = req.files[i].key;
          let location = req.files[i].location;
          const imageEle = { key: key, location: location };
          imageArr[i] = imageEle;
        }

        await Models.Shop.update(
          {
            image_src: JSON.stringify(imageArr),
          },
          {
            where: {
              user_id: userInfo.dataValues.id,
            },
          },
        );
      }
      // const image = {key : req.file.key , src : req.file.location}

      res.status(200).send({ message: '이미지 업로드 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: '서버 에러' });
    }
  },
  patch: async (req, res) => {
    const userInfo = await userAuth(req, res);
    if (!userInfo) {
      return res.status(400).json({ message: '유저정보 없음' });
    }
    delete userInfo.dataValues.password;
    delete userInfo.dataValues.user_salt;

    try {
      const { user_name } = req.params;
      const { image_number } = req.body;
      const shopInfo = await Models.Shop.findOne({
        where: {
          user_id: userInfo.dataValues.id,
        },
        attributes: ['image_src'],
      });
      let image = shopInfo.dataValues.image_src;

      let imageParse = JSON.parse(image);

      imageParse[image_number] = null;

      await Models.Shop.update(
        {
          image_src: JSON.stringify(imageParse),
        },
        {
          where: {
            user_id: userInfo.dataValues.id,
          },
        },
      );
      res.status(201).send({ message: '이미지 변경 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
