import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { codeGenerator } from '../src/utils/codeGenerator.js';

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
});

const maxSize = 20 * 1024 * 1024;

export const uploadS3 = multer({
  limits: { fileSize: maxSize },
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    async key(req, file, cb) {
      cb(null, `${file.fieldname}${await codeGenerator(7)}${path.extname(file.originalname)}`);
    }
  })
}).any();
