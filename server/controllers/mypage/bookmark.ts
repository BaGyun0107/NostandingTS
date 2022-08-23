import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

module.exports = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_name = req.params.user_name;
      const userInfo = await Models.User.findOne({
        where: { user_name: user_name },
      });

      const bookmarkInfo = await Models.Bookmark.findAll({
        where: {
          user_id: userInfo?.id,
          is_marked: 1,
        },
      });

      let bookmarkData: Array<object> = [];

      for (let i = 0; i < bookmarkInfo.length; i++) {
        const shopInfo = await Models.Shop.findAll({
          include: [
            {
              model: Models.User,
              as: 'user',
              attributes: [
                'id',
                'shop_name',
                'address_line1',
                'address_line2',
                'user_name',
              ],
            },
            {
              model: Models.Review,
              as: 'Reviews',
              attributes: [
                'image_src',
                'score',
                'contents',
                'createdAt',
                'updatedAt',
                'id',
              ],
            },
          ],
          where: { id: bookmarkInfo[i]?.shop_id },
          attributes: ['image_src', 'contents', 'id'],
        });

        bookmarkData.push(shopInfo);
      }
      res.status(200).send({ data: bookmarkData, message: '정보 전달 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
