import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

module.exports = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
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
  post: async (req: Request, res: Response, next: NextFunction) => {
    const { user_name } = req.params;

    const userInfo = await Models.User.findOne({
      where: {
        user_name: user_name,
      },
    });

    const shopInfo = await Models.Shop.findOne({
      where: {
        user_id: userInfo?.id,
      },
    });

    try {
      const image = shopInfo?.image_src;

      if (image) {
        const imageParse = JSON.parse(image);

        // null이 위차한 인덱스를 찾고
        // 순서대로 넣어준다.
        const nullIdx: Array<number> = [];
        for (let i = 0; i < imageParse.length; i++) {
          if (imageParse[i] === null) {
            nullIdx.push(i);
          }
        }

        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            let key = req.files[i].key;
            let location = req.files[i].location;
            const imageEle = { key: key, location: location };
            imageParse[nullIdx[i]] = imageEle;
          }
        }

        await Models.Shop.update(
          {
            image_src: JSON.stringify(imageParse),
          },
          {
            where: {
              user_id: userInfo?.id,
            },
          },
        );
      } else {
        const imageArr: any = [null, null, null, null];
        // const imageArr = [];

        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            let key = req.files[i].key;
            let location = req.files[i].location;
            const imageEle = { key: key, location: location };
            imageArr[i] = imageEle;
          }
        }

        await Models.Shop.update(
          {
            image_src: JSON.stringify(imageArr),
          },
          {
            where: {
              user_id: userInfo?.id,
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
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_name } = req.params;
      const userInfo = await Models.User.findOne({
        where: { user_name: user_name },
      });
      const image_number = req.body;
      const shopInfo = await Models.Shop.findOne({
        where: {
          user_id: userInfo?.id,
        },
        attributes: ['image_src'],
      });
      let image = shopInfo?.image_src;
      let imageParse: { [x: string]: null };

      if (image) {
        imageParse = JSON.parse(image);

        imageParse[image_number] = null;

        await Models.Shop.update(
          {
            image_src: JSON.stringify(imageParse),
          },
          {
            where: {
              user_id: userInfo?.id,
            },
          },
        );
      }
      res.status(201).send({ message: '이미지 변경 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
