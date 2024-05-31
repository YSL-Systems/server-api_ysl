import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnauthorizedExceptions } from '../exceptions/unauthorized.js';
import { prismaClient } from '../index.js';
import { verifyAccessToken } from '../services/tokens.js';
import { UnvalidTokenExceptions } from '../exceptions/unvalid-token.js';

const authMiddlewares = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    next(new UnauthorizedExceptions(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED));
  }

  try {
    const verify = await verifyAccessToken(token);

    if (!verify) {
      next(new UnvalidTokenExceptions(ErrorMessage.UNVALID_TOKEN, ErrorCode.UNVALID_TOKEN));
    }

    const user = await prismaClient.user.findUnique({ where: { id: verify.userId } });

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedExceptions(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddlewares;
