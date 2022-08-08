import express from 'express';
import mypage from '../controllers/mypage';
import deleteReview from '../middlewares/deleteS3/delete_review';
const router = express.Router();
const delete_menu = require('../middlewares/deleteS3/delete_menu');
const upload = require('../middlewares/upload/upload');
const uploadMenu = require('../middlewares/upload/upload_menu');
const delete_shop = require('../middlewares/deleteS3/delete_shop');

/**
 * @swagger
 * tags:
 *   name: mypage_reservation
 *   description: 예약 정보 조회 수정 삭제
 */

/**
 * @swagger
 * tags:
 *   name: mypage_bookmark
 *   description: 즐겨찾기 조회
 */

/**
 * @swagger
 * tags:
 *   name: mypage_img
 *   description: 가게 사진정보 조회 추가
 */

/**
 * @swagger
 * tags:
 *   name: mypage_menu
 *   description: 가게 메뉴 조회 수정
 */

/**
 * @swagger
 * tags:
 *   name: mypage_notification
 *   description: 알람 조회
 */

/**
 * @swagger
 * tags:
 *   name: mypage_shopinfo
 *   description: 가게 정보 조회 수정
 */

/**
 * @swagger
 * tags:
 *   name: mypage_userinfo
 *   description: 유저 정보 조회 수정
 */

router.get('/reservation/:user_name', mypage.reservation.get);
router.post(
  '/reservation/:user_name',

  mypage.reservation.post,
);
router.delete('/reservation/:user_name/:id', mypage.reservation.delete);

router.get('/bookmark/:user_name', mypage.bookmark.get);

router.get('/img/:user_name', mypage.img.get);
router.post('/img/:user_name', upload.array('file', 4), mypage.img.post);
router.patch('/img/:user_name', mypage.img.patch);

router.get('/menu/:user_name', mypage.menu.get);
router.post('/menu/:user_name', mypage.menu.post);
router.delete('/menu/:user_name/:id', mypage.menu.delete);

router.get('/notification/:user_name', mypage.notification.get);
router.patch('/notification/:user_name', mypage.notification.patch);
router.patch(
  '/notification/reviewpatch/:user_name',
  mypage.notification.reviewpatch,
);
router.delete('/notification/:user_name', mypage.notification.delete);

router.get('/re_review/:user_name', mypage.re_review.get);
router.post('/re_review/:review_id/:user_name', mypage.re_review.post);
router.delete('/re_review/:rereview_id', mypage.re_review.delete);

router.get('/shopinfo/:user_name', mypage.shopinfo.get);
router.post('/shopinfo/:user_name', mypage.shopinfo.post);

router.get('/userinfo/:user_name', mypage.userinfo.get);
router.patch('/userinfo/:user_name', mypage.userinfo.patch);
router.delete('/userinfo/:user_name', mypage.userinfo.delete);

router.post(
  '/upload/:user_name/:id',
  uploadMenu.array('file', 4),
  mypage.menu_upload.post,
);

router.delete('/review/upload/:id', deleteReview);
router.delete('/menu/:id', delete_menu.delete);
router.delete('/Shop/:id', delete_shop.delete);

/**
 * @swagger
 * paths:
 *  /mypage/reservation/:user_name:
 *    get:
 *      summary: "예약 정보 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_reservation]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 고객 예약 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [ {id : 1 , user_id : user1 , shop_name : 돈꿀꺽 , address_line1 : 제주특별자치도 제주시 애월읍 평화로 2187,
 *                             menu_name : 제주 흑돼지삼겹살, date : 20220618-09:00:00 , shop_id : 90} , {message : "정보 전달 완료"}]
 *        "201":
 *          description: 점주 예약 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [ { user_id : user1 , menu_name : 제주 흑돼지삼겹살, date : 20220618-09:00:00} , {message : "정보 전달 완료"}]
 *        "400":
 *          description: 자료 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "자료 조회 실패"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/reservation/:user_name:
 *    post:
 *      summary: "예약 추가"
 *      description: ""
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      tags: [mypage_reservation]
 *      responses:
 *        "200":
 *          description: 예약 추가 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "예약 추가 완료"}
 *        "400":
 *          description: 중복 예약
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "중복된 예약입니다"}
 *        "500":
 *          description: 예약 실패 / 서버 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Server Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/reservation/:user_name/:reservation_id:
 *    delete:
 *      summary: "예약 취소"
 *      description: ""
 *      tags: [mypage_reservation]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      - in: path
 *        name: reservation_id
 *        required: true
 *        description: 예약 번호
 *        schema:
 *          type: number
 *      responses:
 *        "200":
 *          description: 예약 삭제 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "예약 삭제 완료"}
 *        "500":
 *          description: 예약 삭제 실패 / 서버 에러
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Server Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/bookmark/:user_name:
 *    get:
 *      summary: "즐겨찾기 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_bookmark]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 즐겨찾기 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [ {id : 1 , user_id : 3 , shop_name : 돈꿀꺽 , address_line1 : 제주특별자치도 제주시 애월읍 평화로 2187, user_name : jejudo2,
 *                             score : 4, review_contents : 존맛!, review_id : 1, shop_id : 90, shop.image_src : image.src} , {message : "정보 전달 완료"}]
 *        "500":
 *          description: 자료 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Server Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/img/:user_name:
 *    get:
 *      summary: "가게 사진 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_img]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 즐겨찾기 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [ { user_name : jejudo2 , image_src : image_src,
 *                             user_id : 4} , {message : "정보 전달 완료"}]
 *        "400":
 *          description: 유저 정보 없음
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "유저 정보 없음"}
 *        "500":
 *          description: 자료 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Server Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/img/:user_name:
 *    post:
 *      summary: "가게 사진 추가 / s3 업로드"
 *      description: ""
 *      tags: [mypage_img]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 가게 사진 추가 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "가게 사진 추가 완료"}
 *        "400":
 *          description: 서버 에러 / 사진 추가 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/img/:user_name:
 *    patch:
 *      summary: "가게 사진 수정"
 *      description: ""
 *      tags: [mypage_img]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 가게 사진 수정 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "가게 사진 수정 완료"}
 *        "500":
 *          description: 서버 에러 / 사진 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  mypage/Shop/:id:
 *    delete:
 *      summary: "s3 버킷 업로드 이미지 삭제"
 *      description: ""
 *      tags: [mypage_img]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: 버킷 업로드 이미지의 key
 *          schema:
 *            type: number
 *      responses:
 *        "200":
 *          description: 이미지 삭제 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "이미지 삭제 완료"}
 *        "500":
 *          description: 서버 에러 / 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/menu/:user_name:
 *    get:
 *      summary: "가게 메뉴 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_menu]
 *      responses:
 *        "200":
 *          description: 정보 전달 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [ {user_name : jejudo2 , menu_id : 1, shop_id : 90,
 *                             image_src : image_src, name : 제주 흑돼지삼겹살 , price : 13000}, {message : "정보 전달 완료"}
 *                          ]
 *        "400":
 *          description: 자료 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "자료 조회 실패"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/menu/:user_name:
 *    post:
 *      summary: "가게 메뉴 추가"
 *      description: ""
 *      tags: [mypage_menu]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 메뉴 추가 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "메뉴 추가 완료"}
 *        "500":
 *          description: 서버 에러 / 추가 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/menu/:user_name:
 *    patch:
 *      summary: "가게 메뉴 수정"
 *      description: ""
 *      tags: [mypage_menu]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 메뉴 수정 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "메뉴 수정 완료"}
 *        "500":
 *          description: 서버 에러 / 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  mypage/menu/:id:
 *    delete:
 *      summary: "s3 버킷 업로드 이미지 삭제"
 *      description: ""
 *      tags: [mypage_menu]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: 버킷 업로드 이미지의 key
 *          schema:
 *            type: number
 *      responses:
 *        "200":
 *          description: 이미지 삭제 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "이미지 삭제 완료"}
 *        "500":
 *          description: 서버 에러 / 삭제 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  mypage/re_review/:user_id:
 *    get:
 *      summary: "리뷰 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_re_review]
 *      responses:
 *        "200":
 *          description: 리뷰 조회 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "리뷰 조회 완료"}
 *        "500":
 *          description: 서버 에러 / 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/notification/:user_name:
 *    get:
 *      summary: "알람 정보 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_notification]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 고객 알람 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                               [
 *                                  {
 *                                    "id": 122,
 *                                     "user_id": 26,
 *                                     "reservation_id": 129,
 *                                     "review_id": null,
 *                                     "rereview_id": null,
 *                                     "contents": "test123님 2022-06-15 01:44:00 녹고뫼맛골 예약이 완료되었습니다.",
 *                                     "read": 1,
 *                                     "created_date": "2022-06-14T17:44:00.000Z",
 *                                     "updated_date": "2022-06-18T17:44:00.000Z",
 *                                     "review": null
 *                                   },
 *                                  {"message": "알림 정보 전달 완료"}
 *                                ]
 *        "201":
 *          description: 점주 알람 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                               [
 *                                  {
 *                                    "id": 123,
 *                                    "user_id": 89,
 *                                    "reservation_id": 129,
 *                                    "review_id": null,
 *                                    "rereview_id": null,
 *                                    "contents": "test123님께서 2022-06-15 01:44:00 에 사장님의 녹고뫼맛골 예약이 완료되었습니다.",
 *                                    "read": 0,
 *                                    "created_date": null,
 *                                    "updated_date": "2022-06-18T17:44:00.000Z",
 *                                    "review": null
 *                                  },
 *                                  {"message": "알림 정보 전달 완료"}
 *                               ]
 *        "400":
 *          description: 자료 조회 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "자료 조회 실패"}
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /mypage/notification/:user_name:
 *    patch:
 *      summary: "DB 값 수정 요청"
 *      description: "읽음처리 확인을 위한 DB 값 변경"
 *      tags: [mypage_notification]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      requestBody:
 *        description: id,ㄱㄷ퍋ㅈ 값 요청
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                   example:
 *                            {
 *                              "id": "28",
 *                              "read": "1",
 *                            }
 *      responses:
 *        "200":
 *          description: 알림 수정 완료
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "정보 입력 완료"
 *                          }
 *        "400":
 *          description: 유저 정보 없음
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "유저 정보 없음"
 *                          }
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /mypage/notification/reviewpatch/:user_name:
 *    patch:
 *      summary: "DB 값 수정 요청"
 *      description: "리뷰작성 확인을 위한 DB 값 변경"
 *      tags: [mypage_notification]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      requestBody:
 *        description: id,review 값 요청
 *        required: true
 *        content:
 *          application/json:
 *             schema:
 *                   example:
 *                            {
 *                              "id": "28",
 *                              "review": "0",
 *                            }
 *      responses:
 *        "200":
 *          description: 알림 수정 완료
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "정보 입력 완료"
 *                          }
 *        "400":
 *          description: 유저 정보 없음
 *          content:
 *            application/json:
 *                      example:
 *                          {
 *                            message : "유저 정보 없음"
 *                          }
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /mypage/notification/:user_name:
 *    delete:
 *      summary: "정보 삭제"
 *      description: ""
 *      tags: [mypage_notification]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 정보 삭제 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "정보 삭제 완료"}
 *        "500":
 *          description: Server Error
 */

/**
 * @swagger
 * paths:
 *  /mypage/re_review/:user_name:
 *    post:
 *      summary: "리뷰 추가"
 *      description: "점주가 답글달 때, Post방식으로 요청"
 *      tags: [mypage_re_review]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 리뷰 추가 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "리뷰 추가 완료"}
 *        "500":
 *          description: 서버 에러 / 추가 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/shopinfo/:user_name:
 *    get:
 *      summary: "가게 정보 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_shopinfo]
 *      responses:
 *        "200":
 *          description: 정보 전달 완료
 *        "400":
 *          description: 자료 조회 실패
 */

/**
 * @swagger
 * paths:
 *  mypage/shopinfo/:user_name:
 *    patch:
 *      summary: "가게 정보 수정"
 *      description: ""
 *      tags: [mypage_shopinfo]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 가게 정보 수정 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "가게 정보 수정 완료"}
 *        "500":
 *          description: 서버 에러 / 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/userinfo/:user_id:
 *    get:
 *      summary: "유저 정보 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [mypage_userinfo]
 *      parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: 유저 고유 id
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 정보 전달 완료
 *        "400":
 *          description: 자료 조회 실패
 */

/**
 * @swagger
 * paths:
 *  /mypage/userinfo/:user_id:
 *    patch:
 *      summary: "유저 정보 수정"
 *      description: ""
 *      tags: [mypage_userinfo]
 *      responses:
 *        "200":
 *          description: 회원 정보 수정 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "회원 정보 수정 완료"}
 *        "500":
 *          description: 서버 에러 / 정보 수정 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

/**
 * @swagger
 * paths:
 *  /mypage/userinfo/:user_name:
 *    delete:
 *      summary: "회원 탈퇴"
 *      description: ""
 *      tags: [mypage_userinfo]
 *      parameters:
 *      - in: path
 *        name: user_name
 *        required: true
 *        description: 유저 이름
 *        schema:
 *          type: string
 *      responses:
 *        "200":
 *          description: 회원 탈퇴 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "회원 탈퇴 완료"}
 *        "500":
 *          description: 서버 에러 / 탈퇴 실패
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "Servor Error"}
 */

export default router;
