import { prismaClient } from '../index.js';
import { NotFoundExceptions } from '../exceptions/not-found.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';

export const allCategory = async (req, res) => {
  try {
    const categories = await prismaClient.category.findMany({
      where: { user_id: req.user.id },
    });

    res.json(excludeFieldPrisma(categories, ['created_at', 'updated_at']));
  } catch (error) {
    console.log('error allCategory', error);
    throw new NotFoundExceptions(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }
};

export const changeCategory = async (req, res) => {
  try {
    const { newName, prevName } = req.body;

    await prismaClient.category.updateMany({
      where: { user_id: req.user.id, name: prevName },
      data: { name: newName },
    });

    await prismaClient.system.updateMany({
      where: { user_id: req.user.id, category_name: prevName },
      data: { category_name: newName },
    });

    const categories = await prismaClient.category.findMany({
      where: { user_id: req.user.id },
    });

    const systems = await prismaClient.system.findMany({
      where: { user_id: req.user.id },
    });

    const categoriesExclude = excludeFieldPrisma(categories, ['created_at', 'updated_at']);
    const systemsExclude = excludeFieldPrisma(systems, ['created_at', 'updated_at']);

    res.json({ categories: categoriesExclude, systems: systemsExclude });
  } catch (error) {
    console.log('error changeCategory', error);
    throw new NotFoundExceptions(ErrorMessage.INTERNAL_EXCEPTION, ErrorCode.INTERNAL_EXCEPTION);
  }
};
