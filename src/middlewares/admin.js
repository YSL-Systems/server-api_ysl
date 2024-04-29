import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnauthorizedExceptions } from '../exceptions/unauthorized.js';

const adminMiddlewares = async (req, res, next) => {
  const user = req.user;

  if (user?.role === 'ADMIN' || user?.role === 'SUPERVISOR') {
    next();
  } else {
    next(new UnauthorizedExceptions(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED));
  }
};

export default adminMiddlewares;
