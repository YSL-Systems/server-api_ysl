import multer from 'multer';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnvalidException } from '../exceptions/unvalid.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file', file);

    cb(null, 'public/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new UnvalidException(ErrorMessage.FILE_UNVALID, ErrorCode.FILE_UNVALID), false);
  }
};

export const fileMiddlewares = multer({ storage, fileFilter });
