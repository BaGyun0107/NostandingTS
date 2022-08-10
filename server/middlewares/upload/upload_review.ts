// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import aws from 'aws-sdk';
// import { Request } from 'express';
// import * as dotenv from 'dotenv';

// type FileNameCallback = (error: Error | null, filename: string) => void;

// dotenv.config();

// const s3 = new aws.S3({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2',
// });
// let uploadReview = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'semicolon-nostanding.com',
//     acl: 'public-read-write',
//     key: (
//       req: Request,
//       file: Express.Multer.File,
//       callback: FileNameCallback,
//     ) => {
//       callback(null, `review/${Date.now()}_${file.originalname}`);
//     },
//   }),
// });

// export default uploadReview;
