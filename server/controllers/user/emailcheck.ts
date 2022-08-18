import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);
const { ejsCaller } = require('../../middlewares/ejs/ejsCaller');

dotenv.config();

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const emailInfo = await Models.User.findOne({ where: { email: email } });
      if (emailInfo) {
        return res.status(403).send({ message: '중복되는 이메일이 있습니다.' });
      }

      // 6자리 난수 설정
      const max = 999999;
      const min = 100000;
      const confirmNumber = Math.floor(Math.random() * (max - min)) + min;

      await ejsCaller('emailcheck', email, {
        confirmNumber,
      });

      res
        .status(200)
        .json({ data: confirmNumber, message: '이메일 전송 완료' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
