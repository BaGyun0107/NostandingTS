// import express from 'express';
// import oauth from '../controllers/oauth';
// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: oauth
//  *   description: 소셜 로그인 및 가입
//  */

// router.post('/kakao', oauth.kakao.post);
// router.post('/google', oauth.google.post);

// /**
//  * @swagger
//  * paths:
//  *  /kakao:
//  *    post:
//  *      summary: "카카오 로그인 요청"
//  *      description: "카카오 로그인 요청"
//  *      tags: [oauth]
//  *      responses:
//  *        "200":
//  *          description: 카카오 로그인 성공
//  *          content:
//  *            application/json:
//  *              schema:
//  *                type: object
//  *                properties:
//  *                data :
//  *                 type :  object
//  *                example :
//  *                    {message : "카카오 로그인 성공"}
//  *        "500":
//  *          description: 예약 실패 / 로그인 실패
//  *          content:
//  *            application/json:
//  *              schema:
//  *                type: object
//  *                properties:
//  *                data :
//  *                 type :  object
//  *                example :
//  *                    {message : "Server Error"}
//  */

// /**
//  * @swagger
//  * paths:
//  *  /google:
//  *    post:
//  *      summary: "구글 로그인 요청"
//  *      description: "구글 로그인 요청"
//  *      tags: [oauth]
//  *      responses:
//  *        "200":
//  *          description: 구글 로그인 성공
//  *          content:
//  *            application/json:
//  *              schema:
//  *                type: object
//  *                properties:
//  *                data :
//  *                 type :  object
//  *                example :
//  *                    {message : "구글 로그인 성공"}
//  *        "500":
//  *          description: 예약 실패 / 로그인 실패
//  *          content:
//  *            application/json:
//  *              schema:
//  *                type: object
//  *                properties:
//  *                data :
//  *                 type :  object
//  *                example :
//  *                    {message : "Server Error"}
//  */

// export default router;
