import { Request, Response } from 'express';
import { initModels } from '../../models/init-models';

const { sequelize } = require('../../models');
const Models = initModels(sequelize);
const axios = require('axios');

module.exports = {
  get: async (req: Request, res: Response) => {
    //FD6 음식점 , //CE7 카페
    let url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CE7&y=35.79&x=128.38&radius=20000`;
    let headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const info = await axios
      .get(url, { headers: headers })
      .catch(err => res.status(400).json(err));

    // {
    //   [User]shop_category: '음식점',        category_group_name
    //   [Shop]image_src:
    //   [Shop]phone_number: '010-8885-7876',    phone
    //   [User]shop_name: '동백별장',     place_name
    //   [SHOP]place_url: 'http://place.map.kakao.com/203710945',      place_url
    //   [User]address_line1: '제주특별자치도 제주시 원노형3길 44',     road_address_name
    //   [User]shop_category_city:
    //   [Shop]x: '126.481435627565',    x
    //   [Shop]y: '33.4866056081701'     y
    // }

    for (let n = 0; n < info.data.documents.length; n++) {
      await Models.User.create({
        user_salt: `x1nP0muYg7pRqtqPyvZsF48f34xpXsunhn42sqMFK8qLItl+lIiIB0VZAUic2/Y5HuQeYLlVbd6oSZnM3irYAA==`,
        user_name: 'daegu_cafe',
        password: `OE2Zru69TOuSTSNimkps6fQNkt4R5VSDIO+3Z2dq51jTHiQrDq9XcrI9dDWs/UynhvrFmMz7Ybcobvq3HCwh8A==`,
        shop_category: info.data.documents[n].category_group_name,
        shop_name: info.data.documents[n].place_name,
        address_line1: info.data.documents[n].road_address_name,
        nickname: '대구광역시',
        shop_category_city: '대구',
        is_master: 1,
      });
      await Models.Shop.create({
        user_id: 299 + n,
        business_hour: `0900~2200`,
        holiday: 'Tues',
        contents: 'Daegu cafe로 놀러오세요!',
        phone_number: info.data.documents[n].phone,
        place_url: info.data.documents[n].place_url,
        x: info.data.documents[n].x,
        y: info.data.documents[n].y,
      });
    }
    res.status(200).json({ message: '정보 전달 완료' });
  },
};
