import { BadRequestsExceptions } from '../exceptions/bad-requests.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { prismaClient } from '../index.js';
import { RegistrationScheme } from '../schema/users.js';

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

export const addCategory = async (req, res) => {};
