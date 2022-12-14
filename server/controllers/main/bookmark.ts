import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_name = req.params.user_name;
      const shop_id = Number(req.params.shop_id);

      const userInfo = await Models.User.findOne({
        where: { user_name: user_name },
      });

      const { is_marked } = req.body;

      const bookmarkInfo = await Models.Bookmark.findAll({
        where: {
          user_id: userInfo?.id,
          shop_id: shop_id,
        },
      });

      if (bookmarkInfo.length === 0) {
        if (is_marked === 1) {
          await Models.Bookmark.create({
            user_id: userInfo?.id,
            shop_id: shop_id,
            is_marked: 1,
          });

          return res.status(200).send({ message: '즐겨찾기 추가 완료' });
        }
      } else {
        if (is_marked === 0) {
          await Models.Bookmark.update(
            {
              is_marked: 1,
            },
            {
              where: {
                user_id: userInfo?.id,
                shop_id: shop_id,
              },
            },
          );

          return res.status(200).send({ message: '즐겨찾기 삭제 완료' });
        } else if (is_marked === 1) {
          await Models.Bookmark.update(
            {
              is_marked: 0,
            },
            {
              where: {
                user_id: userInfo?.id,
                shop_id: shop_id,
              },
            },
          );

          return res.status(200).send({ message: '즐겨찾기 추가 완료' });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
