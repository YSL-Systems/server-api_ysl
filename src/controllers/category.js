import { prismaClient } from '../index.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';
import { ChangeCategoryScheme } from '../schema/category.js';

export const allCategory = async (req, res) => {
  const categories = await prismaClient.category.findMany({
    where: { user_id: req.user.id },
  });

  const categoriesResponse = await excludeFieldPrisma(categories, ['created_at', 'updated_at']);

  res.json(categoriesResponse);
};

export const changeCategory = async (req, res) => {
  ChangeCategoryScheme.parse(req.body);

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
};
