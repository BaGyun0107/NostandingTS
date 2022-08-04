const { sequelize } = require('../../models');
const initModels = require('../../models/init-models');
const { User, Menu } = require('../../models');
const Shop = require('../../models/Shop');

module.exports = {
  post: async (req, res) => {
    const { user_name, id } = req.params;

    const userInfo = await User.findOne({
      where: {
        user_name: user_name,
      },
    });

    try {
      const imageArr = [];

      for (let i = 0; i < req.files.length; i++) {
        let key = req.files[i].key;
        let location = req.files[i].location;

        imageArr.push({ key: key, location: location });
      }

      await Menu.update(
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
