import { Response } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { env } from 'process';

dotenv.config();

module.exports = {
  generateAccessToken: data => {
    // accessToken으로 sign한다.
    // console.log(data);
    if (env.ACCESS_SECRET) {
      delete data.dataValues.user_salt;
      delete data.dataValues.password;
      return jwt.sign(data.dataValues, env.ACCESS_SECRET, { expiresIn: '12h' });
    }
  },
  sendAccessToken: (res: Response, accessToken: string) => {
    // accessToken을 쿠키로 전달한다.
    const cookieOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    };
    res.cookie('accessToken', accessToken, cookieOptions);
  },
  isAuthorized: (accessToken: string) => {
    // JWT 토큰 정보를 받아서 검증한다.
    try {
      if (env.ACCESS_SECRET) return jwt.verify(accessToken, env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
