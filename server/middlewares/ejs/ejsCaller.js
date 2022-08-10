// const ejs = require('ejs');
// const nodemailer = require('nodemailer');

// const nostandingLogo = process.env.NOSTANDING_LOGO_IMAGE;

// // ejs로 작성된 html을 불러오는 함수
// const ejsCaller = async (type, email, object) => {
//   // 이메일 송신자 설정
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: `${process.env.EMAIL_ID}`,
//       pass: `${process.env.EMAIL_PASSWORD}`,
//     },
//   });

//   // 비밀번호 찾기 이메일 전송
//   if (type === 'passwordFind') {
//     // ejs 파일에서 html 받아오기
//     let passwordFindHtml;

//     const { confirmNumber } = object;

//     ejs.renderFile(
//       __dirname + '/ejsForm/passwordFind.ejs',
//       {
//         confirmNumber,
//         nostandingLogo,
//       },
//       (err, data) => {
//         if (err) console.log(err);
//         passwordFindHtml = data;
//       },
//     );

//     // 송신 이메일 포맷 및 내용 설정
//     await transporter.sendMail({
//       from: `<${process.env.EMAIL_ID}>`,
//       to: `${email}`,
//       subject: 'Semicolon-Nostanding 비밀번호 찾기 인증번호를 확인해주세요',
//       html: passwordFindHtml,
//     });
//   }
//   if (type === 'emailcheck') {
//     // ejs 파일에서 html 받아오기
//     let passwordFindHtml;

//     const { confirmNumber } = object;

//     ejs.renderFile(
//       __dirname + '/ejsForm/emailcheck.ejs',
//       {
//         confirmNumber,
//         nostandingLogo,
//       },
//       (err, data) => {
//         if (err) console.log(err);
//         passwordFindHtml = data;
//       },
//     );

//     // 송신 이메일 포맷 및 내용 설정
//     await transporter.sendMail({
//       from: `<${process.env.EMAIL_ID}>`,
//       to: `${email}`,
//       subject: 'Semicolon-Nostanding 이메일 인증번호를 확인해주세요',
//       html: passwordFindHtml,
//     });
//   }
// };

// module.exports = {
//   ejsCaller,
// };
