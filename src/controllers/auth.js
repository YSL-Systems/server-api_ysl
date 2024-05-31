import bcrypt from 'bcryptjs';
import { prismaClient } from '../index.js';
import { BadRequestsExceptions } from '../exceptions/bad-requests.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { RegistrationScheme } from '../schema/users.js';
import { NotFoundExceptions } from '../exceptions/not-found.js';
import { generateTokens, removeToken, saveToken } from '../services/tokens.js';
import { InternalException } from '../exceptions/internal-exception.js';

export const registration = async (req, res, next) => {
  RegistrationScheme.parse(req.body);

  const { name, phone, password, role, topic, city, photo } = req.body;

  let user = await prismaClient.user.findUnique({ where: { phone } });

  if (user) {
    throw new BadRequestsExceptions(ErrorMessage.USER_ALREADY_EXISTS, ErrorCode.USER_ALREADY_EXISTS);
  }

  user = await prismaClient.user.create({
    data: {
      name,
      phone,
      password: bcrypt.hashSync(password, 10),
      role,
      topic,
      city,
      photo,
    },
  });

  res.json(user);
};

export const login = async (req, res, next) => {
  const { phone, password } = req.body;

  let user = await prismaClient.user.findUnique({ where: { phone } });

  if (!user) {
    throw new NotFoundExceptions(ErrorMessage.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new BadRequestsExceptions(ErrorMessage.INCORRECT_PASSWORD, ErrorCode.INCORRECT_PASSWORD);
  }

  const tokens = await generateTokens({ userId: user.id });
  const resultSave = await saveToken(user.id, tokens.refresh);

  if (!resultSave) {
    throw new InternalException(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }

  res.json({ user, tokens });
};

export const logout = async (req, res, next) => {
  const { refresh } = req.body;

  const result = await removeToken(refresh);

  res.json({ success: result });
};

export const me = async (req, res, next) => {
  res.json(req.user);
};

export const verify = async (req, res, next) => {
  res.json({ success: true });
};

export const refresh = async (req, res, next) => {
  res.json(req.tokens);
};
