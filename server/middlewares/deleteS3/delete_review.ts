// import aws from 'aws-sdk';
// import * as dotenv from 'dotenv';
// import { Request, Response, NextFunction } from 'express';

// dotenv.config();

// aws.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2',
// });

// const s3 = new aws.S3();

// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     await s3.deleteObject(
//       {
//         Bucket: 'semicolon-nostanding.com',
//         Key: `review/${req.params.id}`,
//       },
//       (err, data) => {
//         if (err) throw err;
//       },
//     );

//     res.send({
//       message: 'S3 삭제 완료',
//     });
//   } catch (err) {
//     res.send({ message: '삭제 실패' });
//   }
// };

// export default deleteReview;
