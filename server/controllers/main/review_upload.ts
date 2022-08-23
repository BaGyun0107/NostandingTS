import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    const { user_name, shop_id } = req.params;

    const userInfo = await Models.User.findOne({
      where: {
        user_name: user_name,
      },
    });

    try {
      const imageArr: Array<object> = [];
      // const imageArr = [];
      const files = req.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          let key = files[i].key;
          let location = files[i].location;
          imageArr.push({ key: key, location: location });
        }
      }

      const reviewInfo = Models.Review.findOne({
        where: {
          user_id: userInfo?.id,
          shop_id: Number(shop_id),
        },
      });

      if (!reviewInfo) {
        await Models.Review.create({
          user_id: userInfo?.id,
          image_src: JSON.stringify(imageArr),
          shop_id: Number(shop_id),
        });
      } else {
        await Models.Review.update(
          {
            image_src: JSON.stringify(imageArr),
          },
          {
            where: {
              user_id: userInfo?.id,
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

  delete: async (req: Request, res: Response) => {
    try {
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
