import multer from 'multer';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnvalidFileExceptions } from '../exceptions/unvalid-file.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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
    cb(new UnvalidFileExceptions(ErrorMessage.UNVALID_FILE, ErrorCode.UNVALID_FILE), false);
  }
};

export const fileMiddlewares = multer({ storage, fileFilter });
