import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

// Local tmp folder
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {
      url: string;
    };
    s3: {
      bucket: string;
      url: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const hash = crypto.randomBytes(10).toString('hex');

        const fileName = `${hash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {
      url: `${process.env.APP_API_URL}/files`,
    },
    s3: {
      bucket: process.env.AWS_S3_BUCKET,
      url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`,
    },
  },
} as IUploadConfig;
