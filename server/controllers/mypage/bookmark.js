// const { sequelize } = require('../../models');
// const initModels = require('../../models/init-models');
// const Models = initModels(sequelize);
// const { userAuth } = require('../../middlewares/authorized/auth');

// module.exports = {
//   get: async (req, res) => {
//     try {
//       const userInfo = await userAuth(req, res);
//       if (!userInfo) {
//         return res.status(400).json({ message: '유저정보 없음' });
//       }
//       delete userInfo.dataValues.password;
//       delete userInfo.dataValues.user_salt;

//       const { user_name } = req.params;
//       const userInfo2 = await Models.User.findOne({
//         where: { user_name: user_name },
//       });
//       const bookmarkInfo = await Models.Bookmark.findAll({
//         where: {
//           user_id: userInfo2.dataValues.id,
//           is_marked: 1,
//         },
//       });

//       let bookmarkData = [];

//       for (let i = 0; i < bookmarkInfo.length; i++) {
//         const shopInfo = await Models.Shop.findAll({
//           include: [
//             {
//               model: Models.User,
//               as: 'user',
//               attributes: [
//                 'id',
//                 'shop_name',
//                 'address_line1',
//                 'address_line2',
//                 'user_name',
//               ],
//             },
//             {
//               model: Models.Review,
//               as: 'Reviews',
//               attributes: [
//                 'image_src',
//                 'score',
//                 'contents',
//                 'createdAt',
//                 'updatedAt',
//                 'id',
//               ],
//             },
//           ],
//           where: { id: bookmarkInfo[i].dataValues.shop_id },
//           attributes: ['image_src', 'contents', 'id'],
//         });

//         bookmarkData.push(shopInfo);
//       }

//       res.status(200).send({ data: bookmarkData, message: '정보 전달 완료' });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: 'Server Error' });
//     }
//   },
// };
