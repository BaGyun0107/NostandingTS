import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { env } from 'process';

const createError = require('../util/error');

dotenv.config();

// const verifyToken = (req, res, next) => {
//   const accessToken = req.cookies.accessToken;
//   if (!accessToken) next(createError(403, '토큰이 존재하지 않습니다.'));

//   if (env.ACCESS_SECRET) {
//     jwt.verify(accessToken, env.ACCESS_SECRET, (err, user) => {
//       if (err) return next(createError(403, '토큰 검증에 실패하였습니다.'));
//       console.log(user);
//       // req.user = user;
//       next();
//     });
//   }
// };

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
  isAuthorized: (req: Request, res: Response, next: NextFunction) => {
    // JWT 토큰 정보를 받아서 검증한다.
    const accessToken = req.cookies.accessToken;
    if (!accessToken) next(createError(403, '토큰이 존재하지 않습니다.'));

    if (env.ACCESS_SECRET) {
      jwt.verify(accessToken, env.ACCESS_SECRET, (err, user) => {
        if (err) return next(createError(403, '토큰 검증에 실패하였습니다.'));
        if (user.user_name === req.params.user_name) {
          next();
        }
      });
    }
    // try {
    //   verifyToken(req, res, next => {
    //     if (user.user_name === req.params.user_name) {
    //       next();
    //     }
    //   });
    // } catch (err) {
    //   next(createError(403, '토큰이 존재하지 않습니다.'));
    // }
  },
};
