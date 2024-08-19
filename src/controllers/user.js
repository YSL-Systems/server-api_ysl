import bcrypt from 'bcryptjs';
import fs from 'fs';

import { prismaClient } from '../index.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';
import { ConflictExceptions } from '../exceptions/conflict.js';
import { UnvalidException } from '../exceptions/unvalid.js';

export const updateUser = async (req, res) => {
  const user = req.body;

  if (user?.phone) {
    let candidat = await prismaClient.user.findFirst({ where: { phone: user.phone } });

    if (candidat) {
      throw new ConflictExceptions(ErrorMessage.USER_ALREADY_EXISTS, ErrorCode.USER_ALREADY_EXISTS);
    }
  }

  const updateUser = await prismaClient.user.update({
    where: { id: +req.params?.id },
    data: user?.password
      ? {
          password: bcrypt.hashSync(user?.password, 10),
        }
      : user,
  });

  const updateUserResponse = await excludeFieldPrisma(updateUser, ['created_at', 'updated_at']);

  res.json(updateUserResponse);
};

export const updateUserImage = async (req, res) => {
  const user = req.user;
  const file = req?.file;

  if (!file) {
    throw new UnvalidException(ErrorMessage.FILE_NOT_FOUND, ErrorCode.FILE_NOT_FOUND);
  }

  const updateUser = await prismaClient.user.update({
    where: { id: user.id },
    data: {
      photo: `avatars/${file.filename}`,
    },
  });

  const updateUserResponse = await excludeFieldPrisma(updateUser, ['created_at', 'updated_at']);

  res.json(updateUserResponse);
};

export const deleteUserImage = async (req, res) => {
  const user = req.user;

  fs.unlink(`public/avatars/${user.photo}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File deleted successfully');
  });

  const updateUser = await prismaClient.user.update({
    where: { id: user.id },
    data: {
      photo: '',
    },
  });

  const updateUserResponse = await excludeFieldPrisma(updateUser, ['created_at', 'updated_at']);

  res.json(updateUserResponse);
};
