import bcrypt from 'bcryptjs';
import { prismaClient } from '../index.js';
import { BadRequestsExceptions } from '../exceptions/bad-requests.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { findToken, generateTokens, removeToken, saveToken, verifyRefreshToken } from '../services/tokens.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';
import { LoginScheme, LogoutScheme, RefreshScheme, RegistrationScheme } from '../schema/auth.js';
import { ConflictExceptions } from '../exceptions/conflict.js';
import { UnauthorizedExceptions } from '../exceptions/unauthorized.js';
import { InternalException } from '../exceptions/internal-exception.js';

export const registration = async (req, res) => {
  RegistrationScheme.parse(req.body);

  const { name, phone, password, role, topic, city, photo } = req.body;
  const user = await prismaClient.user.findUnique({ where: { phone } });

  if (user) {
    throw new ConflictExceptions(ErrorMessage.CONFLICT_USER, ErrorCode.CONFLICT_USER);
  } else {
    await prismaClient.user.create({
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
  }

  res.status(201).json({});
};

export const login = async (req, res) => {
  LoginScheme.parse(req.body);

  const { phone, password } = req.body;

  const user = await prismaClient.user.findUnique({
    where: { phone },
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new BadRequestsExceptions(ErrorMessage.AUTH_UNVALID, ErrorCode.AUTH_UNVALID);
  }

  const tokens = await generateTokens({ user_id: user.id });
  const resultSave = await saveToken(user.id, tokens.refresh);

  if (!resultSave) {
    throw new InternalException(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }

  const userResponse = await excludeFieldPrisma(user, ['created_at', 'updated_at']);

  res.json({ user: userResponse, tokens });
};

export const logout = async (req, res, next) => {
  LogoutScheme.parse(req.body);

  const { refresh } = req.body;
  const result = await removeToken(refresh);

  res.json({ success: result });
};

export const me = async (req, res, next) => {
  const user = await excludeFieldPrisma(req.user, ['created_at', 'updated_at']);
  res.json({ user });
};

export const verify = async (req, res, next) => {
  res.json({});
};

export const refresh = async (req, res) => {
  RefreshScheme.parse(req.body);

  const access_token = req.headers.authorization;
  const { refresh } = req.body;

  if (!access_token) {
    throw new UnauthorizedExceptions(ErrorMessage.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
  }

  const verify = await verifyRefreshToken(refresh);
  const checkDB = await findToken(refresh);

  if (!verify && !checkDB) {
    throw new BadRequestsExceptions(ErrorMessage.FIELDS_UNVALID, ErrorCode.FIELDS_UNVALID);
  }

  const tokens = await generateTokens({ user_id: verify.user_id });
  const resultSave = await saveToken(verify.user_id, tokens.refresh);

  if (!resultSave) {
    throw new InternalException(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }

  res.json(tokens);
};
