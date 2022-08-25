import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

import { Op } from 'sequelize';

module.exports = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    // 가게 이름 , 주소 ,
    const order = req.query.order;
    const shop_category = req.query.shop_category;
    const shop_category_city = req.query.shop_category_city;

    try {
      if (order === 'score') {
        if (shop_category && shop_category_city) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: {
                  [Op.and]: [
                    { shop_category: shop_category },
                    { shop_category_city: shop_category_city },
                  ],
                },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [['score_average', 'DESC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        } else if (shop_category) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: {
                  shop_category: shop_category,
                },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [['score_average', 'DESC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        } else if (shop_category_city) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: { shop_category_city: shop_category_city },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [['score_average', 'DESC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        }
      } else if (order === 'view') {
        if (shop_category && shop_category_city) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: {
                  [Op.and]: [
                    { shop_category: shop_category },
                    { shop_category_city: shop_category_city },
                  ],
                },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [['total_views', 'DESC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        } else if (shop_category) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: {
                  shop_category: shop_category,
                },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [['total_views', 'DESC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        } else if (shop_category_city) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: { shop_category_city: shop_category_city },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [['total_views', 'DESC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        }
      } else {
        if (shop_category && shop_category_city) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: {
                  [Op.and]: [
                    { shop_category: shop_category },
                    { shop_category_city: shop_category_city },
                  ],
                },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [[{ model: Models.User, as: 'user' }, 'shop_name', 'ASC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        } else if (shop_category) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: {
                  shop_category: shop_category,
                },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [[{ model: Models.User, as: 'user' }, 'shop_name', 'ASC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        } else if (shop_category_city) {
          const shopInfo = await Models.Shop.findAll({
            include: [
              {
                model: Models.User,
                as: 'user',
                where: { shop_category_city: shop_category_city },
                attributes: [
                  'shop_category',
                  'shop_name',
                  'shop_category_city',
                  'address_line1',
                  'address_line2',
                ],
              },
              {
                model: Models.Bookmark,
                as: 'Bookmarks',
                attributes: ['is_marked'],
              },
              {
                model: Models.Review,
                as: 'Reviews',
                attributes: [],
              },
            ],
            attributes: ['id', 'image_src', 'total_views', 'score_average'],
            order: [[{ model: Models.User, as: 'user' }, 'shop_name', 'ASC']],
          });

          return res
            .status(200)
            .send({ data: shopInfo, message: '정보 전달 완료' });
        }
      }
    } catch (err) {
      return res.status(500).send({ message: 'Server Error' });
    }
  },
};
