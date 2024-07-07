import bcrypt from 'bcryptjs';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { prismaClient } from '../index.js';
import { NotFoundExceptions } from '../exceptions/not-found.js';
import { BadRequestsExceptions } from '../exceptions/bad-requests.js';
import { InternalException } from '../exceptions/internal-exception.js';
import { generateTokens, saveToken } from '../services/tokens.js';

const loginMiddlewares = async (req, res, next) => {
  const { phone, password } = req.body;

  let user = await prismaClient.user.findUnique({
    where: { phone },
  });

  if (!user) {
    return next(new NotFoundExceptions(ErrorMessage.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND));
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return next(new BadRequestsExceptions(ErrorMessage.INCORRECT_PASSWORD, ErrorCode.INCORRECT_PASSWORD));
  }

  const tokens = await generateTokens({ user_id: user.id });
  const resultSave = await saveToken(user.id, tokens.refresh);

  if (!resultSave) {
    return next(new InternalException(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION));
  }

  req.user = user;
  req.tokens = tokens;

  next();
};

export default loginMiddlewares;
