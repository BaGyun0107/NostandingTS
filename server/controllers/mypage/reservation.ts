// import { initModels } from '../../models/init-models';
// const { Reservation } = require('../../models');
// const { QueryTypes } = require('sequelize');
// const db = require('../../models');
// const { userAuth } = require('../../middlewares/authorized/auth');

// const { sequelize } = require('../../models');
// const Models = initModels(sequelize);
// const schedule = require('node-schedule');

// const { Sequelize } = require('../../models/index');
// const Op = Sequelize.Op;

// module.exports = {
//   get: async (req, res) => {
//     const userInfo = await userAuth(req, res);
//     if (!userInfo) {
//       return res.status(400).json({ message: '유저정보 없음' });
//     }
//     delete userInfo.dataValues.password;
//     delete userInfo.dataValues.user_salt;

//     // reservation - menu - shop
//     if (userInfo.dataValues.is_master === 0) {
//       const query = `SELECT R.id, R.user_id, U.shop_name, U.address_line1, M.name, R.date, S.id as shop_id, S.image_src from Reservation R
//       Join Menu M ON M.id = R.menu_id
//       Join Shop S ON S.id = M.shop_id
//       Join User U ON S.user_id = U.id
//       where R.user_id = ${userInfo.id}
//       ORDER BY R.date DESC;`;

//       const reservationlist = await db.sequelize.query(query, {
//         type: QueryTypes.SELECT,
//       });

//       if (!reservationlist) {
//         res.status(400).send({ message: '자료 조회 실패' });
//       } else {
//         res
//           .status(200)
//           .send({ data: reservationlist, message: '정보 전달 완료' });
//       }
//     } else {
//       const query2 = `SELECT R.id ,R.user_id , R.date , M.name  FROM Reservation R Join Menu M On R.menu_id = M.id

//       Join Shop S On M.shop_id = S.id
//       Join User U On S.user_id = U.id
//       where U.id = ${userInfo.dataValues.id}
//       ORDER BY R.date DESC`;

//       const reservationlist2 = await db.sequelize.query(query2, {
//         type: QueryTypes.SELECT,
//       });

//       if (!reservationlist2) {
//         res.status(400).send({ message: '자료 조회 실패' });
//       } else {
//         res
//           .status(201)
//           .send({ data: reservationlist2, message: '정보 전달 완료' });
//       }
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

//       const { menu_id, date, shop_name } = req.body;

//       const reservationPrev = await Reservation.findOne({
//         where: {
//           user_id: userInfo.dataValues.id,
//           menu_id: menu_id,
//           date: date,
//         },
//       });

//       if (!reservationPrev) {
//         await Reservation.create({
//           user_id: userInfo.dataValues.id,
//           menu_id: menu_id,
//           date: date,
//         });

//         const newReservation = await Reservation.findOne(
//           //* 로그인한 고객의 id 찾기
//           {
//             where: { user_id: userInfo.dataValues.id },
//             order: [['id', 'DESC']],
//           },
//         );

//         await sequelize.transaction(async (t: any) => {
//           const newReservation = await Reservation.findOne(
//             //* 로그인한 고객의 id 찾기
//             {
//               where: { user_id: userInfo.dataValues.id },
//               order: [['id', 'DESC']],
//               transaction: t,
//             },
//           );
//           let newdate = newReservation.dataValues.date;
//           let created = newdate.setHours(newdate.getHours() + 1);
//           let updated = newdate.setDate(newdate.getDate() + 4);

//           const userNotification = await Models.Notification.create(
//             //* 고객알림
//             {
//               reservation_id: newReservation.dataValues.id,
//               user_id: newReservation.dataValues.user_id,
//               contents: `${userInfo.dataValues.nickname}님 ${date} ${shop_name} 예약이 완료되었습니다.`,
//               read: 0,
//               created_date: created,
//               updated_date: updated,
//             },
//             { transaction: t },
//           );

//           if (!userNotification) {
//             //* 유저 알림이 생성되지 않았다면 오류 메세지
//             throw new Error('userNotification 생성 오류');
//           }

//           const shopInfo = await Models.User.findOne({
//             //* 점주의 id 찾기
//             include: [
//               {
//                 model: Models.User,
//                 as: 'user',
//                 where: { shop_name: shop_name },
//                 attributes: ['id', 'shop_name'],
//               },
//             ],
//             transaction: t,
//           });

//           const masterNotification = await Models.Notification.create(
//             //* 점주 알림
//             {
//               reservation_id: newReservation.dataValues.id,
//               user_id: shopInfo?.id ?? 'Error',
//               contents: `${userInfo.dataValues.nickname}님께서 ${date} 에 사장님의 ${shop_name} 예약이 완료되었습니다.`,
//               read: 0,
//               created_date: undefined,
//               updated_date: updated,
//             },
//             { transaction: t },
//           );

//           if (!masterNotification) {
//             //* 점주 알림이 생성되지 않았다면 오류 메세지
//             throw new Error('masterNotification 생성 오류');
//           }
//         });

//         const newNotification = await Models.Notification.findOne(
//           //* 로그인한 고객의 id 찾기
//           {
//             where: {
//               user_id: userInfo.dataValues.id,
//               [Op.not]: [{ created_date: null }],
//             },
//             order: [['id', 'DESC']],
//           },
//         );

//         let createdDate = newNotification?.created_date;
//         //! 서버 바꾸면 밑에 로직 지우기
//         // createdDate.setMinutes(createdDate.getMinutes() - 540);

//         const a = schedule.scheduleJob(createdDate, async function () {
//           await Models.Notification.create(
//             //* 고객알림
//             {
//               reservation_id: newReservation.dataValues.id,
//               user_id: newReservation.dataValues.user_id,
//               contents: `${userInfo.dataValues.nickname}님 ${date} ${shop_name}에서 즐거운 시간 보내셨다면,
// 다른 분들을 위해 소중한 후기 남겨주세요.
// (후기 쓰기는 예약 이후 3일동안 가능합니다.)`,
//               read: 0,
//               created_date: undefined,
//               updated_date: newNotification?.updated_date,
//               review: 1,
//             },
//           );
//         });

//         res.status(200).send({
//           message: '예약 추가 완료',
//         });
//       } else {
//         res.status(400).send({ message: '중복된 예약입니다' });
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: 'Server Error' });
//     }
//   },

//   delete: async (req, res) => {
//     try {
//       const userInfo = await userAuth(req, res);
//       if (!userInfo) {
//         return res.status(400).json({ message: '유저정보 없음' });
//       }
//       delete userInfo.dataValues.password;
//       delete userInfo.dataValues.user_salt;

//       const { id } = req.params;

//       await Reservation.destroy({
//         where: {
//           id: id,
//         },
//       });

//       res.status(200).send({ message: '예약 취소 완료' });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send({ message: 'Server Error' });
//     }
//   },
// };
