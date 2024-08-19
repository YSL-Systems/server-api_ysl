import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnvalidException } from '../exceptions/unvalid.js';

const adminMiddlewares = async (req, res, next) => {
  const user = req.user;

  if (user?.role === 'ADMIN' || user?.role === 'SUPERVISOR') {
    next();
  } else {
    next(new UnvalidException(ErrorMessage.ADMIN_UNVALID, ErrorCode.ADMIN_UNVALID));
  }
};

export default adminMiddlewares;
