import bcrypt from 'bcryptjs';
import { prismaClient } from '../index.js';
import { NotFoundExceptions } from '../exceptions/not-found.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';

export const updateUser = async (req, res) => {
  try {
    const user = req.body;

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
    throw new NotFoundExceptions(ErrorMessage.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND);
  }
};

export const updateUserImage = async (req, res) => {
  try {
    const user = req.body;

    console.log('updateUserImage', req);

    // const updateUser = await prismaClient.user.update({
    //   where: { id: +req.params?.id },
    //   data: {
    //     password: bcrypt.hashSync(user?.password, 10),
    //   },
    // });

    res.json({ success: true });
  } catch (error) {
    throw new NotFoundExceptions(ErrorMessage.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND);
  }
};
