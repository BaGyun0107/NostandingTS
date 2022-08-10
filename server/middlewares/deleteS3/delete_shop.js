// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const aws = require('aws-sdk');
// require('dotenv').config();

// aws.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2',
// });

// const s3 = new aws.S3();

// module.exports = {
//   delete: async (req, res) => {
//     try {
//       await s3.deleteObject(
//         {
//           Bucket: 'semicolon-nostanding.com',
//           Key: `Shop/${req.params.id}`,
//         },
//         (err, data) => {
//           if (err) throw err;
//         },
//       );

//       res.json({
//         message: 'success',
//       });
//     } catch (err) {
//       next(err);
//     }
//   },
// };
