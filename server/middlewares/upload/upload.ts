import multer from 'multer';
import multerS3 from 'multer-s3';
import { env } from 'process';

const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: env.S3_ACCESS_KEY_ID,
  secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const s3 = new aws.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'semicolon-nostanding.com',
    acl: 'public-read-write',
    key: (req, file, callback) => {
      callback(null, `Shop/${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = upload;
