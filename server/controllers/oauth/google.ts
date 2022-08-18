import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);

const {
  generateAccessToken,
  sendAccessToken,
} = require('../../middlewares/tokenFunction/token');
dotenv.config();

module.exports = {
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 요청이 잘못된 경우, 다음 에러메시지를 반환한다.
      const { authorizationCode } = req.body;
      const redirectUri = `${process.env.CLIENT_ORIGIN}/callbackgoogle`;

      if (!authorizationCode)
        return res.status(400).json({ message: 'Bad Request!' });

      const url = `https://www.googleapis.com/oauth2/v4/token?code=${authorizationCode}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
      // authorizationCode로 google_token 을 받아온다.
      const response = await axios.post(url);
      const { access_token } = response.data;
      // google_token으로 데이터를 받아온다.
      const googleUserInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        { headers: { Authorization: `Bearer ${access_token}` } },
      );
      // 데이터베이스에 일치하는 데이터가 있는지 확인한다.
      const { email } = googleUserInfo.data;
      const userInfo = await Models.User.findOne({ where: { email: email } });
      const userEmail = email;
      // 이메일 @ 뒤 자르기
      let newUsername = userEmail.split('@')[0];
      /* Users 테이블에 존재하지 않는 email이라면 회원가입 진행 */
      if (!userInfo) {
        /* 해당 닉네임이 중복이라면 아래 코드 실행 */
        // 1000~9999 4자리 난수 설정
        const max = 9999;
        const min = 1000;
        const tag = Math.floor(Math.random() * (max - min)) + min;

        // 6자리 난수 태그 추가
        newUsername = `${newUsername}${tag}`;

        const createUserInfo = await Models.User.create({
          email,
          user_name: newUsername,
          nickname: newUsername,
          is_master: 0,
          email_key: 'success',
        });

        // 토큰을 발급하고 쿠키에 저장한다.
        const accssToekn = generateAccessToken(createUserInfo);
        sendAccessToken(res, accssToekn);

        return res.status(201).json({
          data: { userInfo: createUserInfo },
          message: '구글 가입 완료',
        });
      }

      /* Users 테이블에 존재하는 email이라면 로그인 진행 */
      // 토큰을 발급하고 쿠키에 저장한다.
      const accssToekn = generateAccessToken(userInfo);
      sendAccessToken(res, accssToekn);
      res.status(200).json({
        data: { userInfo: userInfo },
        message: '구글 로그인 성공',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
