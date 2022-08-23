import { Request, Response, NextFunction } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

module.exports = {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_name = req.params.user_name;

      //고객 정보 불러오기
      const userInfo = await Models.User.findOne({
        include: [
          {
            model: Models.Review,
            as: 'Reviews',
            attributes: [
              'id',
              'shop_id',
              'image_src',
              'score',
              'contents',
              'createdAt',
              'updatedAt',
            ],
          },
          {
            model: Models.Shop,
            as: 'Shops',
            attributes: ['id'],
          },
        ],
        where: { user_name: user_name },
        attributes: ['is_master', 'nickname'],
        order: [[{ model: Models.Review, as: 'Reviews' }, 'id', 'DESC']],
      });

      const is_master = userInfo?.is_master;

      if (is_master === 0) {
        // 유저일 때
        let shopArr: Array<object> = [];
        if (userInfo)
          for (let n = 0; n < userInfo?.Reviews.length; n++) {
            const shopinfo = await Models.Shop.findOne({
              include: [
                {
                  model: Models.User,
                  as: 'user',
                  attributes: ['shop_name'],
                },
              ],
              where: { id: userInfo?.Reviews[n].shop_id },
              attributes: ['id', 'image_src'],
            });
            if (shopinfo) shopArr.push(shopinfo);
          }

        return res
          .status(200)
          .send({ data: userInfo, shopArr, message: '정보 전달 완료' });
      }
      if (is_master === 1) {
        // 점주일 때
        const shopReview = await Models.Shop.findOne({
          include: [
            {
              model: Models.User,
              as: 'user',
              where: { user_name: user_name },
              attributes: ['nickname', 'shop_name'],
            },
            {
              model: Models.Review,
              as: 'Reviews',
              attributes: [
                'id',
                'user_id',
                'image_src',
                'score',
                'contents',
                'createdAt',
                'updatedAt',
              ],
              include: [
                {
                  model: Models.User,
                  as: 'user',
                  attributes: ['nickname'],
                },
              ],
            },
            {
              model: Models.ReReview,
              as: 'ReReviews',
              attributes: [
                'id',
                'review_id',
                'contents',
                'createdAt',
                'updatedAt',
              ],
            },
          ],
          attributes: [],
          order: [[{ model: Models.Review, as: 'Reviews' }, 'id', 'DESC']],
        });

        return res
          .status(200)
          .send({ data: shopReview, message: '정보 전달 완료' });
      }
    } catch (err) {
      res.status(500).send({ message: 'Server Error' });
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review_id: number = Number(req.params.review_id);
      const user_name = req.params.user_name;

      const userInfo = await Models.User.findOne({
        where: { user_name: user_name },
      });

      const shopInfo = await Models.Shop.findOne({
        include: [
          {
            model: Models.User,
            as: 'user',
            where: { user_name: user_name },
            attributes: ['id'],
          },
        ],
        attributes: ['id'],
      });

      const { contents } = req.body;

      if (!contents) {
        return res.status(400).send({ message: '리뷰 작성은 필수입니다.' });
      }
      if (shopInfo)
        await Models.ReReview.create({
          review_id: review_id,
          shop_id: shopInfo?.id,
          contents: contents,
        });

      await sequelize.transaction(async (t: any) => {
        // 유저에게 알람 보내기
        const newRe_review = await Models.ReReview.findOne(
          //* 로그인한 고객의 id 찾기
          {
            include: [
              {
                model: Models.Review,
                as: 'review',
                where: { id: review_id },
              },
            ],
            order: [['id', 'DESC']],
            transaction: t,
          },
        );

        const curr = new Date();
        const newCurr = curr.toLocaleDateString('ko-kr');
        const updated = curr.setDate(curr.getDate() + 4);

        if (newRe_review) {
          const masterNotification = await Models.Notification.create(
            //* 고객알림
            {
              user_id: newRe_review?.review.user_id,
              rereview_id: newRe_review?.id,
              contents: `${userInfo?.shop_name} 사장님이 ${newCurr} 고객님의 리뷰에 답글을 작성하셨습니다.`,
              read: 0,
              updated_date: updated,
            },
            { transaction: t },
          );

          if (!masterNotification) {
            //* 유저 알림이 생성되지 않았다면 오류 메세지
            throw new Error('masterNotification 생성 오류');
          }
        }
      });
      res.status(200).send({ message: '리뷰 작성 완료' });
    } catch (err) {
      res.status(500).send({ message: 'Server Error' });
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rereview_id } = req.params;

      await Models.ReReview.destroy({ where: { id: rereview_id } });

      res.status(201).send({ message: '대댓글 삭제 완료' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Server Error' });
    }
  },
};
