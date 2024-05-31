import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnauthorizedExceptions } from '../exceptions/unauthorized.js';
import { findToken, generateTokens, saveToken, verifyRefreshToken } from '../services/tokens.js';
import { UnvalidTokenExceptions } from '../exceptions/unvalid-token.js';

const refreshMiddlewares = async (req, res, next) => {
  const token = req.headers.authorization;
  const { refresh } = req.body;

  if (!token) {
    next(new UnauthorizedExceptions(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED));
  }

  try {
    const verify = await verifyRefreshToken(refresh);
    const tokenDB = await findToken(refresh);

    if (!verify || !tokenDB) {
      next(new UnvalidTokenExceptions(ErrorMessage.UNVALID_TOKEN, ErrorCode.UNVALID_TOKEN));
    }
    const tokens = await generateTokens({ userId: verify.userId });
    await saveToken(verify.userId, tokens.refresh);

    req.tokens = tokens;
    next();
  } catch (error) {
    next(new UnauthorizedExceptions(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED));
  }
};

export default refreshMiddlewares;
