import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';
import axios from 'axios';
import schedule from 'node-schedule';
import { Op } from 'sequelize';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

const { userAuth } = require('../../middlewares/authorized/auth');

module.exports = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo?.password;
      delete userInfo?.user_salt;

      const { user_name } = req.params;

      // 현재 시간(Local)
      const curr = new Date();
      curr.setSeconds(curr.getSeconds() + 10);

      let deleteSchedule = schedule.scheduleJob(curr, async function () {
        await axios.delete(
          `${process.env.SERVER_ORIGIN}/mypage/notification/${user_name}`,
        );
      });

      const notificationInfo = await Models.Notification.findAll({
        include: [
          {
            model: Models.Reservation,
            as: 'reservation',
            include: [
              {
                model: Models.Menu,
                as: 'menu',
              },
            ],
          },
          {
            model: Models.Review,
            as: 'Review',
          },
          {
            model: Models.ReReview,
            as: 'rereview',
          },
        ],
        order: [['id', 'DESC']],
        where: { user_id: userInfo.dataValues.id },
      });

      if (notificationInfo) {
        return res.status(200).send({
          data: notificationInfo,
          message: '알림 정보 전달 완료',
        });
      } else {
        return res.status(201).send({ message: '삭제된 알림 입니다.' });
      }
    } catch (err) {
      return res.status(500).send({ message: 'Server Error' });
    }
  },
  patch: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { id, read } = req.body;
      const notificationUpdate = await Models.Notification.update(
        {
          read: read,
        },
        { where: { user_id: userInfo.dataValues.id, id: id } },
      );
      return res.status(200).send({
        data: { notificationInfo: notificationUpdate },
        message: '정보 입력 완료',
      });
    } catch (err) {
      res.status(500).send({ message: 'Server Error' });
    }
  },
  reviewpatch: async (req, res) => {
    try {
      const userInfo = await userAuth(req, res);
      if (!userInfo) {
        return res.status(400).json({ message: '유저정보 없음' });
      }
      delete userInfo.dataValues.password;
      delete userInfo.dataValues.user_salt;

      const { id, review } = req.body;
      const notificationUpdate = await Models.Notification.update(
        {
          review: review,
        },
        { where: { user_id: userInfo.dataValues.id, id: id } },
      );
      return res.status(200).send({
        data: { notificationInfo: notificationUpdate },
        message: '알림 확인',
      });
    } catch (err) {
      res.status(500).send({ message: 'Server Error' });
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    // 현재 시간(Local)
    const curr = new Date();
    curr.setMinutes(curr.getMinutes() + 10);

    const { user_name } = req.params;

    const userInfo = await Models.User.findOne({
      //* 고객정보 불러오기
      where: { user_name: user_name },
    });

    const notificationDate = await Models.Notification.findOne({
      //* user_id를 이용하여 Notification테이블에 삭제할 기준의 날짜불러와 오름차순으로 정렬
      where: {
        user_id: userInfo?.id,
        updated_date: {
          [Op.lte]: curr,
        },
      },
      order: [['updated_date', 'DESC']],
    });

    if (notificationDate?.updated_date) {
      if (curr > notificationDate?.updated_date) {
        const notificationInfo = await Models.Notification.findOne({
          //* Notification테이블에 삭제할 기준의 날짜와 동일한 정보들 불러오기
          where: { updated_date: notificationDate?.updated_date },
        });

        let date = notificationInfo?.updated_date;
        //* 삭제할 기준의 + 2시간 정도의 모든 데이터 삭제하기
        if (date) {
          date.setHours(date.getHours() + 2);

          await Models.Notification.destroy({
            where: {
              updated_date: {
                //* updated_date <= 삭제할 기준의 +2시간
                [Op.lte]: date,
              },
            },
          });
        }

        return res.status(200).send({ message: '정보 삭제 완료' });
      }
    }
    res.status(201).send({ message: '삭제할 정보 없음' });
  },
};
