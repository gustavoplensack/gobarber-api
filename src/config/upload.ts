import path from 'path';
import multer from 'multer';
import crypto from 'crypto';
import { request } from 'express';

// Local tmp folder
const tmpFolder = path.resolve(__dirname,'..','..','tmp')

export default {
  dir: tmpFolder,

  storage: multer.diskStorage({
    destination:tmpFolder,
    filename (request,file,callback) {
      const hash = crypto.randomBytes(10).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      return callback(null,fileName);
    }
  }),
};
