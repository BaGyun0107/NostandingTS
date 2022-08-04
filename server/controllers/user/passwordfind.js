require('dotenv').config();
const { User } = require('../../models');
const { ejsCaller } = require('../../middlewares/ejs/ejsCaller');
const crypto = require('crypto');
const util = require('util');
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

module.exports = {
  emailsend: async (req, res) => {
    try {
      const { user_name } = req.body;
      // 클라이언트로부터 전달받은 user_name이 DB에 존재하는지 확인한다
      const userInfo = await User.findOne({ where: { user_name: user_name } });
      if (!userInfo)
        return res.status(403).json({ message: '등록되지 않은 아이디 입니다' });

      // 6자리 난수 설정
      const max = 999999;
      const min = 100000;
      const confirmNumber = Math.floor(Math.random() * (max - min)) + min;

      email = userInfo.dataValues.email;

      // User 이메일로 인증번호 발송
      await ejsCaller('passwordFind', email, {
        confirmNumber,
      });

      // 인증번호 입력 시간이 지나면, email_key가 다시 expired로 변경한다 (email_key !== 'success')
      setTimeout(async () => {
        const userInfo = await User.findOne({
          where: { user_name: user_name },
        });
        if (userInfo.dataValues.email_key !== 'success') {
          await User.update(
            { email_key: 'expired' },
            { where: { email: email } },
          );
        }
      }, 180000);

      res
        .status(200)
        .json({ data: confirmNumber, message: '이메일 전송 완료' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  confirm: async (req, res) => {
    try {
      const { user_name, confirmNumber, confirm_body } = req.body;
      const userInfo = await User.findOne({ where: { user_name: user_name } });

      // 유저 테이블에 email_key 필드를 업데이트
      if (Number(confirmNumber) === Number(confirm_body)) {
        await User.update(
          { email_key: 'success' },
          { where: { user_name: user_name } },
        );
        return res.status(200).json({ message: '인증 완료' });
      }
      res.status(403).json({ message: '인증번호가 일치하지 않습니다.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
  passwordchange: async (req, res) => {
    try {
      const { user_name, password } = req.body;
      // 클라이언트로부터 전달받은 user_name이 DB에 존재하는지 확인한다
      const userInfo = await User.findOne({ where: { user_name: user_name } });
      // 64바이트 Salt 생성, buffer 형식이므로 base64 문자열로 변환
      const salt = crypto.randomBytes(64).toString('base64');
      // password를 salt를 첨가하여 sha512 알고리즘으로 305943번 해싱 후 64바이트 buffer 형식으로 반환
      const key = await pbkdf2Promise(password, salt, 305943, 64, 'sha512');
      // key값은 buffer 형식이므로 base64 문자열로 변환한 값을 hashedPassword 변수에 넣는다.
      const hashedPassword = key.toString('base64');

      User.update(
        {
          password: password ? hashedPassword : userInfo.dataValues.password,
          user_salt: password ? salt : userInfo.dataValues.user_salt,
        },
        { where: { user_name: user_name } },
      );

      res.status(200).json({ message: '패스워드 변경 완료' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  },
};
