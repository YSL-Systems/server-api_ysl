import bcrypt from 'bcryptjs';
import { prismaClient } from '../index.js';
import { BadRequestsExceptions } from '../exceptions/bad-requests.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { RegistrationScheme } from '../schema/users.js';
import { removeToken } from '../services/tokens.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';

export const registration = async (req, res) => {
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

export const login = async (req, res) => {
  const user = excludeFieldPrisma(req.user, ['created_at', 'updated_at']);
  const tokens = req.tokens;

  res.json({ user, tokens });
};

export const logout = async (req, res, next) => {
  const { refresh } = req.body;

  const result = await removeToken(refresh);

  res.json({ success: result });
};

export const me = async (req, res, next) => {
  res.json(excludeFieldPrisma(req.user, ['created_at', 'updated_at']));
};

export const verify = async (req, res, next) => {
  res.json({ success: true });
};

export const refresh = async (req, res, next) => {
  res.json(req.tokens);
};
