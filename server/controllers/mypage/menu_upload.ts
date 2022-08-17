import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    const { user_name, id } = req.params;

    try {
      const imageArr: Array<object> = [];

      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          let key = req.files[i].key;
          let location = req.files[i].location;

          imageArr.push({ key: key, location: location });
        }
      }

      await Models.Menu.update(
        {
          image_src: JSON.stringify(imageArr),
        },
        { where: { id: id } },
      );
      res.status(200).send({ message: '이미지 업로드 완료' });
    } catch (err) {
      console.log(err);
      res.send('서버 에러');
    }
  },
};
