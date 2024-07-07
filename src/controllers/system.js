import { prismaClient } from '../index.js';
import { NotFoundExceptions } from '../exceptions/not-found.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';

export const allSystems = async (req, res) => {
  try {
    const systems = await prismaClient.system.findMany({
      where: { user_id: req.user.id },
    });

    res.json(excludeFieldPrisma(systems, ['created_at', 'updated_at']));
  } catch (error) {
    console.log('error favoriteSystem', error);
    throw new NotFoundExceptions(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }
};

export const changeSystem = async (req, res) => {
  try {
    const { newName, prevName } = req.body;

    await prismaClient.system.updateMany({
      where: { user_id: req.user.id, name: prevName },
      data: { name: newName },
    });

    const systems = await prismaClient.system.findMany({
      where: { user_id: req.user.id },
    });

    res.json(excludeFieldPrisma(systems, ['created_at', 'updated_at']));
  } catch (error) {
    console.log('error changeSystem', error);
    throw new NotFoundExceptions(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }
};

export const favoriteSystem = async (req, res) => {
  const { favorite } = req.body;

  try {
    await prismaClient.system.update({
      where: { id: +req.params?.id, user_id: req.user.id },
      data: { favorite },
    });

    const systems = await prismaClient.system.findMany({
      where: { user_id: req.user.id },
    });

    res.json(excludeFieldPrisma(systems, ['created_at', 'updated_at']));
  } catch (error) {
    console.log('error favoriteSystem', error);
    throw new NotFoundExceptions(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }
};
