import { Request, Response, NextFunction } from 'express';
import aws from 'aws-sdk';
import * as dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

aws.config.update({
  accessKeyId: env.S3_ACCESS_KEY_ID,
  secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const s3 = new aws.S3();

module.exports = {
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await s3.deleteObject(
        {
          Bucket: 'semicolon-nostanding.com',
          Key: `review/${req.params.id}`,
        },
        (err, data) => {
          if (err) throw err;
        },
      );

      res.send({
        message: 'S3 삭제 완료',
      });
    } catch (err) {
      res.send({ message: '삭제 실패' });
    }
  },
};
