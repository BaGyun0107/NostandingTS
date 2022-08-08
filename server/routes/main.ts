import express from 'express';
import main from '../controllers/main';

const router = express.Router();
const uploadReview = require('../middlewares/upload/upload_review');
const delete_review = require('../middlewares/deleteS3/delete_review');

/**
 * @swagger
 * tags:
 *   name: main
 *   description: 메인 페이지 조회
 */

/**
 * @swagger
 * tags:
 *   name: main_review
 *   description: 리뷰 작성 및 삭제
 */

/**
 * @swagger
 * tags:
 *   name: main_bookmark
 *   description: 리뷰 작성 및 삭제
 */

router.get('/', main.main.get);
router.get('/shop/:id', main.shop.get);
router.get('/category', main.category.get);
router.get('/search', main.search.get);
router.post('/review/:user_name/:shop_id', main.review.post);
router.delete('/review/id/:review_id', main.review_upload.delete);
router.delete('/review/:id', delete_review.delete);
router.post(
  '/review/upload/:user_name/:shop_id',
  uploadReview.array('file', 4),
  main.review_upload.post,
);
router.post('/bookmark/:shop_id/:user_name', main.bookmark.post);

/**
 * @swagger
 * paths:
 *  /:
 *    get:
 *      summary: "메인 페이지 데이터 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [main]
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
 *                          [ {image.src : image.src, id : id, shop_category : 음식점, shop_category_city : 제주,
 *                              shop_name : 돈꿀꺽 , address_line1 : 제주특별자치도 제주시 애월읍 평화로 2187 ,  address_line2 : "", is_marked : 1,
 *                             total_views : 112 , score_average : 3.8}, {message : "정보 전달 완료"}
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
 *  /shop/:id:
 *    get:
 *      summary: "가게 상세 정보 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [main]
 *      parameters:
 *      - in : path
 *        name : id
 *        required : true
 *        description : shop의 id
 *        schema:
 *          type: Number
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
 *                          [ {image.src : image.src, id : id, shop_category : 음식점, shop_category_city : 제주, user_name : jejudo2,
 *                              shop_name : 돈꿀꺽 , address_line1 : 제주특별자치도 제주시 애월읍 평화로 2187 ,  address_line2 : "", is_marked : 1,
 *                             review_score : 4 , review_contents : 완전 맛있어요! , menu_id : 1 , name : 제주 흑돼지삼겹살,
 *                             price : 13000, business_hour : 0900~2200 , holiday : Mon , shop_contents : 제주도 식당에 오신 걸 환영합니다!,
 *                             review_image.src : image.src , x : 126.777 , y : 38.123 , total_views : 150, score_average : 4.7}, {message : "정보 전달 완료"}
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
 *  /category:
 *    get:
 *      summary: "메인 페이지 카테고리 별 데이터 조회"
 *      description: "선택한 카테고리에 맞는 데이터를 뽑아 보낸다"
 *      tags: [main]
 *      parameters:
 *      - in: query
 *        name: shop_category
 *        required: false
 *        description: 가게 카테고리
 *        schema:
 *          type: string
 *      - in: query
 *        name:  shop_category_city
 *        required: false
 *        description: 지역 카테고리
 *        schema:
 *          type: string
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
 *                          [ {image.src : image.src, id : id, shop_category : 음식점, shop_category_city : 제주,
 *                              shop_name : 돈꿀꺽 , address_line1 : 제주특별자치도 제주시 애월읍 평화로 2187 ,  address_line2 : "", is_marked : 1,
 *                             total_views : 112 , score_average : 3.8}, {message : "정보 전달 완료"}
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
 *  /search:
 *    get:
 *      summary: "메인 페이지 검색 데이터 조회"
 *      description: ""
 *      tags: [main]
 *      parameters:
 *      - in: query
 *        name: text
 *        required: false
 *        description: 검색명
 *        schema:
 *          type: string
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
 *                          [ {image.src : image.src, id : id, shop_category : 음식점, shop_category_city : 제주,
 *                              shop_name : 돈꿀꺽 , address_line1 : 제주특별자치도 제주시 애월읍 평화로 2187 ,  address_line2 : "", is_marked : 1,
 *                             total_views : 112 , score_average : 3.8}, {message : "정보 전달 완료"}
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
 *  /review/:shop_id/:user_name :
 *    post:
 *      summary: "리뷰 추가"
 *      description: ""
 *      tags: [main_review]
 *      parameters:
 *        - in: path
 *          name: shop_id
 *          required: true
 *          description: 가게 고유 ID
 *          schema:
 *            type: number
 *        - in: path
 *          name: user_name
 *          description: 유저 아이디
 *          schema:
 *            type: string
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
 *  /review/id/:review_id:
 *    delete:
 *      summary: "등록된 리뷰 삭제"
 *      description: ""
 *      tags: [main_review]
 *      parameters:
 *        - in: path
 *          name: review_id
 *          required: true
 *          description: 리뷰 고유 ID
 *          schema:
 *            type: number
 *      responses:
 *        "200":
 *          description: 리뷰 삭제 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "리뷰 삭제 완료"}
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
 *  /review/:id:
 *    delete:
 *      summary: "s3 버킷 업로드 이미지 삭제"
 *      description: ""
 *      tags: [main_review]
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
 *  /review/upload/:user_name/:shop_id:
 *    post:
 *      summary: "s3 버킷 이미지 업로드"
 *      description: ""
 *      tags: [main_review]
 *      parameters:
 *        - in: path
 *          name: user_name
 *          required: true
 *          description: 리뷰 작성자 name
 *          schema:
 *            type: string
 *        - in: path
 *          name: shop_id
 *          required: true
 *          description: 리뷰 작성할 가게 id
 *          schema:
 *            type: number
 *      responses:
 *        "200":
 *          description: 이미지 업로드 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "이미지 업로드 완료"}
 *        "500":
 *          description: 서버 에러 / 업로드 실패
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
 *  /bookmark/:shop_id/:user_name:
 *    post:
 *      summary: "즐겨찾기 추가"
 *      description: ""
 *      tags: [main_bookmark]
 *      parameters:
 *        - in: path
 *          name: shop_id
 *          required: true
 *          description: 즐겨찾기 할 가게 id
 *          schema:
 *            type: number
 *        - in: path
 *          name: user_name
 *          required: true
 *          description: 유저 name
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 즐겨찾기 추가 완료
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                data :
 *                 type :  object
 *                example :
 *                    {message : "즐겨찾기 추가 완료"}
 *        "500":
 *          description: 서버 에러 / 즐겨찾기 추가 실패
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
