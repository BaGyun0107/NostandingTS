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
// s3 버킷 연결하기

const s3 = new aws.S3();

module.exports = {
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 삭제 메소드활용(버킷에 주어진 key값을 활용하여 삭제)
      await s3.deleteObject(
        {
          Bucket: 'semicolon-nostanding.com',
          Key: `menu/${req.params.id}`,
        },
        (err, data) => {
          if (err) throw err;
        },
      );

      res.json({
        message: 'success',
      });
    } catch (err) {
      next(err);
    }
  },
};
