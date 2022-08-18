import * as dotenv from 'dotenv';
import { env } from 'process';
import multer from 'multer';
import multerS3 from 'multer-s3';

const aws = require('aws-sdk');

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: env.S3_ACCESS_KEY_ID,
  secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  region: env.S3_REGION,
});

let bucket = env?.BUCKET_NAME;

if (bucket) {
  let upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, cb) => {
        cb(null, `Shop/${Date.now()}_${file.originalname}`);
      },
    }),
  });

  exports.upload = upload;
}
