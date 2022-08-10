// module.exports = {
//   post: async (req, res) => {
//     try {
//       //쿠키 만료
//       res.cookie('accessToken', null, {
//         maxAge: 0,
//       });
//       // 로그아웃 성공
//       return res.status(200).json({ message: '로그아웃 성공' });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({ message: '서버에러' });
//     }
//   },
// };
