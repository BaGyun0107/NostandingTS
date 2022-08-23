import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

require('dotenv').config();

module.exports = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    const { order } = req.query;

    if (order === 'score') {
      const mainInfo = await Models.Shop.findAll({
        // 샵사진, 리뷰별점, 리뷰리뷰
        include: [
          {
            model: Models.User,
            as: 'user',
            attributes: [
              'shop_category',
              'shop_name',
              'shop_category_city',
              'address_line1',
              'address_line2',
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
            attributes: [
              'image_src',
              'score',
              'contents',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
        attributes: ['image_src', 'id', 'total_views', 'score_average'],
        order: [['score_average', 'DESC']],
      });
      return res
        .status(200)
        .send({ data: mainInfo, message: '별점 재정렬 전달 완료' });
    }

    if (order === 'view') {
      const mainInfo = await Models.Shop.findAll({
        // 샵사진, 리뷰별점, 리뷰리뷰
        include: [
          {
            model: Models.User,
            as: 'user',
            attributes: [
              'shop_category',
              'shop_name',
              'shop_category_city',
              'address_line1',
              'address_line2',
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
            attributes: [
              'image_src',
              'score',
              'contents',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
        attributes: ['image_src', 'id', 'total_views', 'score_average'],
        order: [['total_views', 'DESC']],
      });

      return res
        .status(200)
        .send({ data: mainInfo, message: '리뷰수 재정렬 전달 완료' });
    } else {
      const mainInfo = await Models.Shop.findAll({
        // 샵사진, 리뷰별점, 리뷰리뷰
        include: [
          {
            model: Models.User,
            as: 'user',
            attributes: [
              'shop_category',
              'shop_name',
              'shop_category_city',
              'address_line1',
              'address_line2',
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
            attributes: [
              'image_src',
              'score',
              'contents',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
        attributes: ['image_src', 'id', 'total_views', 'score_average'],
        order: [[{ model: Models.User, as: 'user' }, 'shop_name', 'ASC']],
      });

      return res
        .status(200)
        .send({ data: mainInfo, message: '기본정렬 전달 완료' });
    }
  },
};
