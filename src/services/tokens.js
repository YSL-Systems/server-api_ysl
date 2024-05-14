import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRECH_SECRET } from '../secrets.js';
import { prismaClient } from '../index.js';

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
    const user = await prismaClient.user.findFirst({ where: { id } });
    const userToken = await prismaClient.token.findFirst({ where: { userId: id } });

    if (user && userToken) {
      const result = await prismaClient.token.updateMany({
        where: { userId: id },
        data: { token },
      });

      return result;
    } else {
      const result = await prismaClient.token.create({
        data: {
          userId: user.id,
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
  const payload = await prismaClient.token.deleteMany({ where: { token } });

  if (payload) {
    return true;
  }
};

export const findToken = async (token) => {
  const payload = await prismaClient.token.findFirst({ where: { token } });

  return payload;
};
