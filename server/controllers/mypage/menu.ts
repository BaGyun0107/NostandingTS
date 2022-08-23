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
          {
            model: Models.Menu,
            as: 'Menus',
            attributes: ['id', 'shop_id', 'image_src', 'name', 'price'],
          },
        ],
        attributes: [],
      });
      res.status(200).send({ data: shopInfo, message: '정보 전달 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { shop_id, name, price } = req.body;

      const img = [null];

      const menuUpdate = await Models.Menu.create({
        shop_id: shop_id,
        name: name,
        price: price,
        image_src: JSON.stringify(img),
      });
      res.status(200).send({
        data: { menuInfo: menuUpdate },
        message: '정보 입력 완료',
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      await Models.Menu.destroy({ where: { id: id } });

      res.status(201).send({ message: '정보 삭제 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
