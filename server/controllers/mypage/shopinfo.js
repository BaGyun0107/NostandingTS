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
//       const shopInfo = await Models.Shop.findAll({
//         //상호명 운영시간 전화번호 휴무일 가게소개
//         include: [
//           {
//             model: Models.User,
//             as: 'user',
//             where: { user_name: user_name },
//             attributes: ['user_name', 'shop_name'],
//           },
//         ],
//         attributes: [
//           'id',
//           'user_id',
//           'business_hour',
//           'phone_number',
//           'holiday',
//           'contents',
//         ],
//       });
//       res.status(200).send({ data: shopInfo, message: '정보 전달 완료' });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: 'Sever Error' });
//     }
//   },
//   post: async (req, res) => {
//     try {
//       const userInfo = await userAuth(req, res);
//       if (!userInfo) {
//         return res.status(400).json({ message: '유저정보 없음' });
//       }
//       delete userInfo.dataValues.password;
//       delete userInfo.dataValues.user_salt;

//       const {
//         user_id,
//         shop_name,
//         business_hour,
//         phone_number,
//         holiday,
//         contents,
//       } = req.body;

//       const shopInfo = await Models.Shop.findOne({
//         where: {
//           user_id: user_id,
//         },
//       });

//       if (!shopInfo) {
//         return res.status(200).send({ message: '가게 정보가 없습니다.' });
//       } else {
//         const shopUpdate = await Models.Shop.update(
//           {
//             shop_name: shop_name ? shop_name : shopInfo.dataValues.shop_name,
//             business_hour: business_hour
//               ? business_hour
//               : userInfo.dataValues.business_hour,
//             phone_number: phone_number
//               ? phone_number
//               : shopInfo.dataValues.phone_number,
//             holiday: holiday ? holiday : shopInfo.dataValues.holiday,
//             contents: contents ? contents : shopInfo.dataValues.contents,
//           },
//           { where: { user_id: user_id } },
//         );
//         res.status(200).send({
//           data: { shopInfo: shopUpdate },
//           message: '정보 입력 완료',
//         });
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: 'Server Error' });
//     }
//   },
// };
