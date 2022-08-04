const { User } = require('../../models');
const {
  generateAccessToken,
  sendAccessToken,
} = require('../../middlewares/tokenFunction/token');
const util = require('util');
const crypto = require('crypto');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  post: async (req, res) => {
    try {
      const { user_name, password } = req.body;
      //유저아이디와 패스워드의 입력값이 비었을 때
      if (!user_name || !password) {
        return res
          .status(400)
          .send({ message: '아이디와 비밀번호 입력은 필수 입니다.' });
      }
      const userNameInfo = await User.findOne({
        where: { user_name: user_name },
      });
      //데이터베이스에 없는 아이디일 때
      if (!userNameInfo) {
        return res
          .status(400)
          .send({ message: '입력하신 아이디가 존재하지않습니다.' });
      }
      //미리 저장해둔 user_salt 컬럼을 불러온다.
      const userSalt = userNameInfo.dataValues.user_salt;
      //req.body의 패스워드값을 userInfo에 담긴 userSalt로 똑같이 해싱한다.
      const key = await pbkdf2Promise(password, userSalt, 305943, 64, 'sha512');
      // 문자열로 변환 후 변수에 저장
      const hashedPassword = key.toString('base64');
      //입력한 값과 해싱한 패스워드를 넣어 일치하는 유저정보를 가져온다.
      const userInfo = await User.findOne({
        where: {
          user_name: user_name,
          password: hashedPassword,
        },
      });
      if (!userInfo) {
        return res.status(400).send({ message: '로그인에 실패하였습니다.' });
      } else {
        //패스워드 지우기
        delete userInfo.dataValues.password;

        const accessToken = generateAccessToken(userInfo.dataValues);
        sendAccessToken(res, accessToken);

        return res.status(200).send({
          data: { userInfo: userInfo },
          message: '로그인에 성공하였습니다',
        });
      }
    } catch (err) {
      return res.status(500).send({ message: '서버 에러' });
    }
  },
};
