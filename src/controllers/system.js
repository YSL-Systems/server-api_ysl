import { prismaClient } from '../index.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';
import { AddSystemScheme, ChangeSystemScheme, FavoriteSystemScheme } from '../schema/system.js';
import { ConflictExceptions } from '../exceptions/conflict.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { BadRequestsExceptions } from '../exceptions/bad-requests.js';

export const allSystems = async (req, res) => {
  const systems = await prismaClient.system.findMany({
    where: { user_id: req.user.id },
    include: {
      scenarios: true,
      sensors: true,
      outputs: true,
    },
  });

  const systemResponse = await excludeFieldPrisma(systems, ['created_at', 'updated_at']);

  res.json(systemResponse);
};

export const addSystem = async (req, res) => {
  AddSystemScheme.parse(req.body);
  const { user_id, system, category, name } = req.body;

  const systemsDb = await prismaClient.system.findMany({ where: { system, user_id } });

  if (systemsDb.length) {
    throw new ConflictExceptions(ErrorMessage.CONFLICT_SYSTEM, ErrorCode.CONFLICT_SYSTEM);
  }

  const categoryTypeDb = await prismaClient.categoryType.findUnique({ where: { category } });

  if (categoryTypeDb) {
    const categoryDb = await prismaClient.category.findMany({ where: { user_id, category } });

    if (!categoryDb.length) {
      await prismaClient.category.create({
        data: { user_id, category, name: categoryTypeDb.name, image: categoryTypeDb.image, gradient: categoryTypeDb.gradient },
      });
    }

    await prismaClient.system.create({
      data: { user_id, system, category, category_name: categoryTypeDb.name, name },
    });

    res.status(201).json({});
  } else {
    throw new BadRequestsExceptions(ErrorMessage.FIELDS_UNVALID, ErrorCode.FIELDS_UNVALID);
  }
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
    include: {
      scenarios: true,
      sensors: true,
      outputs: true,
    },
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
