import { prismaClient } from '../index.js';
import { verifyAccessToken } from '../services/tokens.js';
import { UnvalidException } from '../exceptions/unvalid.js';
import { InternalException } from '../exceptions/internal-exception.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnauthorizedExceptions } from '../exceptions/unauthorized.js';

const authMiddlewares = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new UnauthorizedExceptions(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED));
  }

  const verify = await verifyAccessToken(token);

  if (!verify) {
    return next(new UnvalidException(ErrorMessage.TOKEN_UNVALID, ErrorCode.TOKEN_UNVALID));
  }

  try {
    const user = await prismaClient.user.findUnique({ where: { id: verify.user_id } });

    req.user = user;
    next();
  } catch (error) {
    next(new InternalException(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION));
  }
};

export default authMiddlewares;
