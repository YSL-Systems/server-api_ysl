import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRECH_SECRET } from '../secrets.js';
import { prismaClient } from '../index.js';
import { BadRequestsExceptions } from '../exceptions/bad-requests.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';

export const generateTokens = async (payload) => {
  const access = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '15m' });
  const refresh = jwt.sign(payload, JWT_REFRECH_SECRET, { expiresIn: '15d' });

  return {
    access,
    refresh,
  };
};

export const verifyAccessToken = async (token) => {
  try {
    const user = jwt.verify(token, JWT_ACCESS_SECRET);

    return user;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = async (token) => {
  try {
    const user = jwt.verify(token, JWT_REFRECH_SECRET);

    return user;
  } catch (error) {
    return null;
  }
};

export const saveToken = async (id, token) => {
  try {
    const user = await prismaClient.user.findUnique({ where: { id } });
    const userToken = await prismaClient.token.findUnique({ where: { user_id: id } });

    if (user && userToken) {
      const result = await prismaClient.token.update({
        where: { user_id: id },
        data: { token },
      });

      return result;
    } else {
      const result = await prismaClient.token.create({
        data: {
          user_id: user.id,
          token,
        },
      });
      return result;
    }
  } catch (error) {
    return false;
  }
};

export const removeToken = async (token) => {
  try {
    const payload = await prismaClient.token.delete({ where: { token } });

    return payload;
  } catch (error) {
    throw new BadRequestsExceptions(ErrorMessage.FIELDS_UNVALID, ErrorCode.FIELDS_UNVALID);
  }
};

export const findToken = async (token) => {
  try {
    const payload = await prismaClient.token.findUnique({ where: { token } });

    return payload;
  } catch (error) {
    throw new BadRequestsExceptions(ErrorMessage.FIELDS_UNVALID, ErrorCode.FIELDS_UNVALID);
  }
};
