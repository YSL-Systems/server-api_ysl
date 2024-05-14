import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';

import { prismaClient } from '../index.js';
import { NotFoundExceptions } from '../exceptions/not-found.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { BadRequestsExceptions } from '../exceptions/bad-requests.js';
import { UnvalidFileExceptions } from '../exceptions/unvalid-file.js';

export const updateUser = async (req, res) => {
  const user = req.body;

  if (user?.phone) {
    let candidat = await prismaClient.user.findFirst({ where: { phone: user.phone } });

    if (candidat) {
      throw new BadRequestsExceptions(ErrorMessage.USER_ALREADY_EXISTS, ErrorCode.USER_ALREADY_EXISTS);
    }
  }

  // if (user?.password) {
  //   let candidat = await prismaClient.user.findFirst({ where: { phone: user.phone } });
  //   if (!bcrypt.compareSync(password, user.password)) {
  //     throw new BadRequestsExceptions(ErrorMessage.INCORRECT_PASSWORD, ErrorCode.INCORRECT_PASSWORD);
  //   }
  // }

  try {
    const updateUser = await prismaClient.user.update({
      where: { id: +req.params?.id },
      data: user?.password
        ? {
            password: bcrypt.hashSync(user?.password, 10),
          }
        : user,
    });

    res.json(updateUser);
  } catch (error) {
    throw new NotFoundExceptions(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }
};

export const updateUserImage = async (req, res) => {
  const user = req.user;
  const file = req?.file;

  if (!file) {
    throw new UnvalidFileExceptions(ErrorMessage.FILE_NOT_FOUND, ErrorCode.FILE_NOT_FOUND);
  }

  try {
    const updateUser = await prismaClient.user.update({
      where: { id: user.id },
      data: {
        photo: file.filename,
      },
    });

    res.json(updateUser);
  } catch (error) {
    console.log('ERROR updateUserImage', error);
    throw new NotFoundExceptions(ErrorMessage.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND);
  }
};

export const deleteUserImage = async (req, res) => {
  const user = req.user;

  try {
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

    res.json(updateUser);
  } catch (error) {
    console.log('ERROR updateUserImage', error);
    throw new NotFoundExceptions(ErrorMessage.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND);
  }
};
