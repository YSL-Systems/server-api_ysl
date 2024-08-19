import { prismaClient } from '../index.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';
import { ChangeSystemScheme, FavoriteSystemScheme } from '../schema/system.js';

export const allSystems = async (req, res) => {
  const systems = await prismaClient.system.findMany({
    where: { user_id: req.user.id },
  });

  const systemResponse = await excludeFieldPrisma(systems, ['created_at', 'updated_at']);

  res.json(systemResponse);
};

export const changeSystem = async (req, res) => {
  ChangeSystemScheme.parse(req.body);
  const { newName, prevName } = req.body;

  await prismaClient.system.updateMany({
    where: { user_id: req.user.id, name: prevName },
    data: { name: newName },
  });

  const systems = await prismaClient.system.findMany({
    where: { user_id: req.user.id },
  });

  const systemsResponse = await excludeFieldPrisma(systems, ['created_at', 'updated_at']);

  res.json(systemsResponse);
};

export const favoriteSystem = async (req, res) => {
  FavoriteSystemScheme.parse({ favorite: req.body.favorite, id: req.params?.id });
  const { favorite } = req.body;

  await prismaClient.system.update({
    where: { id: +req.params?.id, user_id: req.user.id },
    data: { favorite },
  });

  const systems = await prismaClient.system.findMany({
    where: { user_id: req.user.id },
  });

  const systemsResponse = await excludeFieldPrisma(systems, ['created_at', 'updated_at']);

  res.json(systemsResponse);
};
