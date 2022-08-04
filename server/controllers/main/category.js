const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const Models = initModels(sequelize);
const { Op } = require('sequelize');

module.exports = {
  get: async (req, res) => {
    // 가게 이름 , 주소 ,
    const { order } = req.query;

    try {
      if (order === 'score') {
        const { shop_category, shop_category_city } = req.query;
        const shopInfo = await Models.Shop.findAll({
          include: [
            {
              model: Models.User,
              as: 'user',
              where: {
                [Op.and]: [
                  shop_category ? { shop_category: shop_category } : null,
                  shop_category_city
                    ? { shop_category_city: shop_category_city }
                    : null,
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

        const arrInfo = [];
        shopInfo.map(el => {
          arrInfo.push({
            image_src: el.image_src,
            id: el.id,
            shop_category: el.user.shop_category,
            shop_category_city: el.user.shop_category_city,
            shop_name: el.user.shop_name,
            address_line1: el.user.address_line1,
            address_line2: el.user.address_line2,
            is_marked: el.Bookmarks.is_marked,
            total_views: el.total_views,
            score_average: el.score_average,
          });
        });

        return res
          .status(200)
          .send({ data: arrInfo, message: '정보 전달 완료' });
      } else if (order === 'view') {
        const { shop_category, shop_category_city } = req.query;
        const shopInfo = await Models.Shop.findAll({
          include: [
            {
              model: Models.User,
              as: 'user',
              where: {
                [Op.and]: [
                  shop_category ? { shop_category: shop_category } : null,
                  shop_category_city
                    ? { shop_category_city: shop_category_city }
                    : null,
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

        const arrInfo = [];
        shopInfo.map(el => {
          arrInfo.push({
            image_src: el.image_src,
            id: el.id,
            shop_category: el.user.shop_category,
            shop_category_city: el.user.shop_category_city,
            shop_name: el.user.shop_name,
            address_line1: el.user.address_line1,
            address_line2: el.user.address_line2,
            is_marked: el.Bookmarks.is_marked,
            total_views: el.total_views,
            score_average: el.score_average,
          });
        });

        return res
          .status(200)
          .send({ data: arrInfo, message: '정보 전달 완료' });
      } else {
        const { shop_category, shop_category_city } = req.query;
        const shopInfo = await Models.Shop.findAll({
          include: [
            {
              model: Models.User,
              as: 'user',
              where: {
                [Op.and]: [
                  shop_category ? { shop_category: shop_category } : null,
                  shop_category_city
                    ? { shop_category_city: shop_category_city }
                    : null,
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

        const arrInfo = [];
        shopInfo.map(el => {
          arrInfo.push({
            image_src: el.image_src,
            id: el.id,
            shop_category: el.user.shop_category,
            shop_category_city: el.user.shop_category_city,
            shop_name: el.user.shop_name,
            address_line1: el.user.address_line1,
            address_line2: el.user.address_line2,
            is_marked: el.Bookmarks.is_marked,
            total_views: el.total_views,
            score_average: el.score_average,
          });
        });

        return res
          .status(200)
          .send({ data: arrInfo, message: '정보 전달 완료' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'Server Error' });
    }
  },
};
