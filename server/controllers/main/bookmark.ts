import { Request, Response, NextFunction } from 'express';
const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const Models = initModels(sequelize);

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { shop_id, user_name } = req.params;

      const userInfo = await Models.User.findOne({
        where: { user_name: user_name },
      });

      const { is_marked } = req.body;

      const bookmarkInfo = await Models.Bookmark.findAll({
        where: {
          user_id: userInfo.dataValues.id,
          shop_id: shop_id,
        },
      });

      if (bookmarkInfo.length === 0) {
        if (is_marked === true) {
          await Models.Bookmark.create({
            user_id: userInfo.dataValues.id,
            shop_id: shop_id,
            is_marked: true,
          });

          res.status(200).send({ message: '즐겨찾기 추가 완료' });
        }
      } else {
        if (is_marked === false) {
          await Models.Bookmark.update(
            {
              is_marked: false,
            },
            {
              where: {
                user_id: userInfo.dataValues.id,
                shop_id: shop_id,
              },
            },
          );

          res.status(200).send({ message: '즐겨찾기 삭제 완료' });
        } else if (is_marked === true) {
          await Models.Bookmark.update(
            {
              is_marked: true,
            },
            {
              where: {
                user_id: userInfo.dataValues.id,
                shop_id: shop_id,
              },
            },
          );

          res.status(200).send({ message: '즐겨찾기 다시 추가' });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
