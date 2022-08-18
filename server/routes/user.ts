import express from 'express';

const router = express.Router();
const user = require('../controllers/user');

/**
 * @swagger
 * tags:
 *   name: user
 *   description: 유저 추가 조회
 */

router.post('/login', user.login.post);
router.post('/logout', user.logout.post);
router.post('/signup', user.signup.post);

router.post('/emailcheck', user.emailcheck.post);

router.post('/emailsend', user.passwordfind.emailsend);
router.post('/confirm', user.passwordfind.confirm);
router.post('/passwordchange', user.passwordfind.passwordchange);

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      summary: "로그인 요청"
 *      description: "user_name, password를 body로 받아 post방식으로 요청"
 *      tags: [user]
 *      requestBody:
 *        description: 로그인 요청
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                   example:
 *                          {
 *                             "user_name" : "user1",
 *                             "password" : "test"
 *                          }
 *      responses:
 *        "200":
 *          description: 로그인 성공
 *        "400":
 *          description: 로그인 실패
 */

/**
 * @swagger
 * paths:
 *  /logout:
 *    post:
 *      summary: "로그아웃 요청"
 *      description: ""
 *      tags: [user]
 *      responses:
 *        "200":
 *          description: 로그아웃 성공
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "로그아웃에 성공하였습니다"
 *                          }
 *        "400":
 *          description: 로그아웃 실패
 */

/**
 * @swagger
 * paths:
 *  /signup:
 *    post:
 *      summary: "회원가입 요청"
 *      description: "필수요소 정보들을 body에 받아 post방식으로 요청"
 *      tags: [user]
 *      requestBody:
 *        description: 로그인 요청
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                   example:
 *                            {
 *                              "user_name": "user2",
 *                              "password": "user2",
 *                              "nickname": "user2",
 *                              "phone_number": "01022223333",
 *                              "email": "email@email.com",
 *                              "email_key": "success",
 *                              "is_master": false
 *                             }
 *      responses:
 *        "200":
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "회원가입에 성공하였습니다"
 *                          }
 *        "400":
 *          description: 회원가입 실패
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "필수항목을 모두 입력해야 합니다"
 *                          }
 *        "403":
 *          description: 중복확인
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "중복되는 (아이디,닉네임,이메일,가게이름)이 존재합니다."
 *                          }
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /emailcheck:
 *    post:
 *      summary: "이메일 중복확인 요청 및 인증 요청"
 *      description: "email을 body로 받아 post 방식으로 요청"
 *      tags: [user]
 *      responses:
 *        "200":
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            data : 426431,
 *                            message : "이메일 전송 완료"
 *                          }
 *        "403":
 *          description: 회원가입 실패
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "중복되는 이메일이 있습니다"
 *                          }
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /emailsend:
 *    post:
 *      summary: "비밀번호 찾기 위한 이메일 전송 요청"
 *      description: "user_name을 body로 받아 post 방식으로 요청"
 *      tags: [user]
 *      responses:
 *        "200":
 *          description: 회원가입 성공
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            data : 666024,
 *                            message : "이메일 전송 완료"
 *                          }
 *        "403":
 *          description: 회원가입 실패
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "등록되지 않은 아이디 입니다"
 *                          }
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /confirm:
 *    post:
 *      summary: "비밀번호 찾기 이메일 인증 요청"
 *      description: "confirmNumber, confirm_body을 body로 받아 post 방식으로 요청"
 *      tags: [user]
 *      responses:
 *        "200":
 *          description: 인증 성공
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "인증 완료"
 *                          }
 *        "403":
 *          description: 인증 실패
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "인증번호가 일치하지 않습니다"
 *                          }
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /passwordchange:
 *    post:
 *      summary: "비밀번호 변경 요청"
 *      description: "password을 body로 받아 post 방식으로 요청"
 *      tags: [user]
 *      responses:
 *        "200":
 *          description: 패스워드 변경 성공
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "패스워드 변경 완료"
 *                          }
 *        "403":
 *          description: 패스워드 변경 실패
 *        "500":
 *          description: Server Error
 */
module.exports = router;
