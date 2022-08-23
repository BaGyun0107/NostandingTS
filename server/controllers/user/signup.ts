import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import { initModels } from '../../models/init-models';
import crypto from 'crypto';
import util from 'util';

import axios from 'axios';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

dotenv.config();

//promisify는  util의 내장된 메소드로 비동기화를 해주는 역할을 한다.
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user_name,
        password,
        nickname,
        phone_number,
        shop_name,
        shop_category,
        shop_category_city,
        address_line1,
        address_line2,
        postal_code,
        email,
        email_key,
        is_master,
      } = req.body;

      //ismaster가 false 일 때
      if (is_master === false) {
        //고객으로 회원가입
        if (!user_name || !password || !nickname || !phone_number || !email) {
          return res
            .status(400)
            .send({ message: '필수항목을 모두 입력해주셔야 합니다.' });
        }
        //DB와 req.body가 중복되는지 확인
        const userNameInfo = await Models.User.findOne({
          where: {
            user_name: user_name,
          },
        });
        const nickNameInfo = await Models.User.findOne({
          where: {
            nickname: nickname,
          },
        });
        const emailInfo = await Models.User.findOne({
          where: {
            email: email,
          },
        });
        //DB와 req.body가 중복된다면 실패처리하기
        if (userNameInfo) {
          //
          return res
            .status(403)
            .send({ message: '중복되는 아이디가 존재합니다.' });
        }
        if (nickNameInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 닉네임이 있습니다.' });
        }
        if (emailInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 이메일이 있습니다.' });
        } else {
          // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
          const salt = crypto.randomBytes(64).toString('base64');
          // password를 salt를 첨가하여 sha512 알고리즘으로 305943번 해싱 후 64바이트 buffer 형식으로 반환
          const key = await pbkdf2Promise(password, salt, 305943, 64, 'sha512');
          // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
          const hashedPassword = key.toString('base64');

          if (email_key === 'success') {
            await Models.User.create({
              user_name: user_name,
              password: hashedPassword, // 해싱된 비밀번호
              user_salt: salt, // 유저 고유의 Salt값 DB에 저장 (추후 로그인에 필요)
              nickname: nickname,
              phone_number: phone_number,
              email: email,
              email_key: 'success',
              is_master: 0,
            });
          }

          return res.status(201).send({ message: '회원가입 완료' });
        }
      }
      if (is_master === true) {
        // 점주로 회원가입
        if (
          !user_name ||
          !password ||
          !nickname ||
          !phone_number ||
          !email ||
          !shop_name ||
          !shop_category ||
          !shop_category_city ||
          !address_line1
        ) {
          return res
            .status(400)
            .send({ message: '필수항목을 모두 입력해주셔야 합니다.' });
        }
        //DB와 req.body가 중복되는지 확인
        const userNameInfo = await Models.User.findOne({
          where: {
            user_name: user_name,
          },
        });
        const nickNameInfo = await Models.User.findOne({
          where: {
            nickname: nickname,
          },
        });
        const emailInfo = await Models.User.findOne({
          where: {
            email: email,
          },
        });
        const shopNameInfo = await Models.User.findOne({
          where: {
            shop_name: shop_name,
          },
        });
        //DB와 req.body가 중복된다면 실패처리하기
        if (userNameInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 아이디가 존재합니다.' });
        }
        if (nickNameInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 닉네임이 있습니다.' });
        }
        if (emailInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 이메일이 있습니다.' });
        }
        if (shopNameInfo) {
          return res
            .status(403)
            .send({ message: '중복되는 가게이름이 존재합니다.' });
        } else {
          // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
          const salt = crypto.randomBytes(64).toString('base64');
          // password를 salt를 첨가하여 sha512 알고리즘으로 305943번 해싱 후 64바이트 buffer 형식으로 반환
          const key = await pbkdf2Promise(password, salt, 305943, 64, 'sha512');
          // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
          const hashedPassword = key.toString('base64');

          if (email_key === 'success') {
            await Models.User.create({
              user_salt: salt, // 유저 고유의 Salt값 DB에 저장 (추후 로그인에 필요)
              user_name: user_name,
              password: hashedPassword, // 해싱된 비밀번호
              nickname: nickname,
              phone_number: phone_number,
              shop_name: shop_name,
              shop_category: shop_category,
              shop_category_city: shop_category_city,
              address_line1: address_line1,
              address_line2: address_line2,
              postal_code: postal_code,
              email: email,
              email_key: 'success',
              is_master: 1,
            });
          }

          const newUser = await Models.User.findOne({
            where: { user_name: user_name },
          });

          const roadaddress = address_line1;
          let url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
            roadaddress,
          )}`;

          let headers = {
            Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
          };

          const info: any = await axios
            .get(url, { headers: headers })
            .catch(err => res.send(err));

          if (newUser)
            await Models.Shop.create({
              user_id: newUser?.id,
              business_hour: undefined,
              image_src: JSON.stringify([null, null, null, null]),
              phone_number: phone_number,
              holiday: undefined,
              contents: undefined,
              x: info.data.documents[0].x,
              y: info.data.documents[0].y,
              place_url: undefined,
            });
          return res.status(201).send({ message: '회원가입 완료' });
        }
      }
    } catch (err) {
      res.status(500).send({ message: '서버 에러' });
    }
  },
};
