// const { userAuth } = require('../../middlewares/authorized/auth');
// const { User } = require('../../models');
// const { Op } = require('sequelize');
// const util = require('util');
// const crypto = require('crypto');
// const pbkdf2Promise = util.promisify(crypto.pbkdf2);
// const { sequelize } = require('../../models');
// const initModels = require('../../models/init-models');
// const Models = initModels(sequelize);

// module.exports = {
//   get: async (req, res) => {
//     try {
//       const userInfo = await userAuth(req, res);
//       if (!userInfo) {
//         return res.status(400).json({ message: '유저정보 없음' });
//       }
//       delete userInfo.dataValues.password;
//       delete userInfo.dataValues.user_salt;

//       return res
//         .status(200)
//         .send({ data: { userInfo: userInfo }, message: '조회 성공' });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: 'Server Error' });
//     }
//   },
//   patch: async (req, res) => {
//     try {
//       const userInfo = await userAuth(req, res);
//       if (!userInfo) {
//         return res.status(400).json({ message: '유저정보 없음' });
//       } else {
//         const {
//           user_name,
//           password,
//           nickname,
//           phone_number,
//           shop_name,
//           shop_category,
//           shop_category_city,
//           address_line1,
//           address_line2,
//           postal_code,
//           email,
//           is_master,
//         } = req.body;

//         if (is_master === 0) {
//           // 고객일 때

//           // 요청 바디에 nickname이 있다면, 나를 제외한 nickname 중 이미 존재하는지 검사
//           if (nickname) {
//             const nicknameInfo = await User.findOne({
//               where: {
//                 nickname: nickname,
//                 [Op.not]: [{ id: userInfo.dataValues.id }],
//               },
//             });
//             // 이미 존재하는 nickname이면 요청 거절
//             if (nicknameInfo) {
//               return res.status(400).send({ message: '닉네임이 존재합니다.' });
//             }
//           }

//           if (password) {
//             // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
//             const salt = crypto.randomBytes(64).toString('base64');
//             // password를 salt를 첨가하여 sha512 알고리즘으로 305943번 해싱 후 64바이트 buffer 형식으로 반환
//             const key = await pbkdf2Promise(
//               password,
//               salt,
//               305943,
//               64,
//               'sha512',
//             );
//             // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
//             const hashedPassword = key.toString('base64');

//             await User.update(
//               {
//                 user_salt: salt ? salt : userInfo.dataValues.salt,
//                 user_name: userInfo.dataValues.user_name,
//                 password: hashedPassword
//                   ? hashedPassword
//                   : userInfo.dataValues.password,
//                 nickname: nickname ? nickname : userInfo.dataValues.nickname,
//                 phone_number: phone_number
//                   ? phone_number
//                   : userInfo.dataValues.nickname,
//               },
//               { where: { id: userInfo.dataValues.id } },
//             );
//             return res.status(200).send({ message: '변경 완료' });
//           }

//           await User.update(
//             {
//               user_salt: userInfo.dataValues.salt,
//               user_name: userInfo.dataValues.user_name,
//               password: userInfo.dataValues.password,
//               nickname: nickname ? nickname : userInfo.dataValues.nickname,
//               phone_number: phone_number
//                 ? phone_number
//                 : userInfo.dataValues.nickname,
//             },
//             { where: { id: userInfo.dataValues.id } },
//           );

//           return res.status(200).send({ message: '변경 완료' });
//         }

//         if (is_master === 1) {
//           // 점주일 때

//           // 요청 바디에 nickname이 있다면, 나를 제외한 nickname 중 이미 존재하는지 검사
//           if (nickname) {
//             const nicknameInfo = await User.findOne({
//               where: {
//                 nickname: nickname,
//                 [Op.not]: [{ id: userInfo.dataValues.id }],
//               },
//             });
//             // 이미 존재하는 nickname이면 요청 거절
//             if (nicknameInfo) {
//               return res.status(400).send({ message: '닉네임이 존재합니다.' });
//             }
//           }

//           if (password) {
//             // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
//             const salt = crypto.randomBytes(64).toString('base64');
//             // password를 salt를 첨가하여 sha512 알고리즘으로 305943번 해싱 후 64바이트 buffer 형식으로 반환
//             const key = await pbkdf2Promise(
//               password,
//               salt,
//               305943,
//               64,
//               'sha512',
//             );
//             // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
//             const hashedPassword = key.toString('base64');

//             await User.update(
//               {
//                 user_salt: salt ? salt : userInfo.dataValues.salt,
//                 user_name,
//                 password: hashedPassword
//                   ? hashedPassword
//                   : userInfo.dataValues.password,
//                 nickname: nickname ? nickname : userInfo.dataValues.nickname,
//                 phone_number: phone_number
//                   ? phone_number
//                   : userInfo.dataValues.nickname,
//                 shop_name: shop_name
//                   ? shop_name
//                   : userInfo.dataValues.shop_name,
//                 shop_category: shop_category
//                   ? shop_category
//                   : userInfo.dataValues.shop_category,
//                 shop_category_city: shop_category_city
//                   ? shop_category_city
//                   : userInfo.dataValues.shop_category_city,
//                 address_line1: address_line1
//                   ? address_line1
//                   : userInfo.dataValues.address_line1,
//                 address_line2: address_line2
//                   ? address_line2
//                   : userInfo.dataValues.address_line2,
//                 postal_code: postal_code
//                   ? postal_code
//                   : userInfo.dataValues.postal_code,
//                 email: email ? email : userInfo.dataValues.email,
//               },
//               { where: { id: userInfo.dataValues.id } },
//             );
//           }

//           await User.update(
//             {
//               user_salt: userInfo.dataValues.salt,
//               user_name,
//               password: userInfo.dataValues.password,
//               nickname: nickname ? nickname : userInfo.dataValues.nickname,
//               phone_number: phone_number
//                 ? phone_number
//                 : userInfo.dataValues.nickname,
//               shop_name: shop_name ? shop_name : userInfo.dataValues.shop_name,
//               shop_category: shop_category
//                 ? shop_category
//                 : userInfo.dataValues.shop_category,
//               shop_category_city: shop_category_city
//                 ? shop_category_city
//                 : userInfo.dataValues.shop_category_city,
//               address_line1: address_line1
//                 ? address_line1
//                 : userInfo.dataValues.address_line1,
//               address_line2: address_line2
//                 ? address_line2
//                 : userInfo.dataValues.address_line2,
//               postal_code: postal_code
//                 ? postal_code
//                 : userInfo.dataValues.postal_code,
//               email: email ? email : userInfo.dataValues.email,
//             },
//             { where: { id: userInfo.dataValues.id } },
//           );

//           return res.status(200).send({ message: '변경 완료' });
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: 'Server Error' });
//     }
//   },
//   delete: async (req, res) => {
//     try {
//       /* 로그인 인증 검사 */
//       const userInfo = await userAuth(req, res);
//       if (!userInfo) return res.status(400).send({ message: '유저정보 없음' });

//       await Models.User.destroy({ where: { id: userInfo.id } }); // 유저 삭제
//       // 유저 삭제
//       res.cookie('accessToken', null, { maxAge: 0 }); // 쿠키 삭제
//       res.status(200).send({ message: '회원탈퇴 완료' });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).send({ message: 'Server Error!' });
//     }
//   },
// };
