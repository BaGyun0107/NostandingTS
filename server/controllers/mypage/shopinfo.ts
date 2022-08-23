import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

module.exports = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_name } = req.params;
      const shopInfo = await Models.Shop.findAll({
        //상호명 운영시간 전화번호 휴무일 가게소개
        include: [
          {
            model: Models.User,
            as: 'user',
            where: { user_name: user_name },
            attributes: ['user_name', 'shop_name'],
          },
        ],
        attributes: [
          'id',
          'user_id',
          'business_hour',
          'phone_number',
          'holiday',
          'contents',
        ],
      });
      return res
        .status(200)
        .send({ data: shopInfo, message: '정보 전달 완료' });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'Sever Error' });
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_name } = req.params;
      const {
        user_id,
        shop_name,
        business_hour,
        phone_number,
        holiday,
        contents,
      } = req.body;

      const userShopName = await Models.User.findOne({
        where: {
          id: user_id,
        },
      });
      const shopInfo = await Models.Shop.findOne({
        include: [
          {
            model: Models.User,
            as: 'user',
            attributes: ['shop_name'],
          },
        ],
        where: {
          user_id: user_id,
        },
      });

      if (!shopInfo) {
        return res.status(200).send({ message: '가게 정보가 없습니다.' });
      } else {
        const shopNameUpdate = await userShopName?.update(
          {
            shop_name: shop_name ? shop_name : userShopName?.shop_name,
          },
          { where: { id: user_id } },
        );
        const shopUpdate = await shopInfo.update(
          {
            business_hour: business_hour
              ? business_hour
              : shopInfo?.business_hour,
            phone_number: phone_number ? phone_number : shopInfo?.phone_number,
            holiday: holiday ? holiday : shopInfo?.holiday,
            contents: contents ? contents : shopInfo?.contents,
          },
          { where: { user_id: user_id } },
        );
        res.status(200).send({
          data: { shopInfo: shopUpdate, shopNameUpdate },
          message: '정보 입력 완료',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
