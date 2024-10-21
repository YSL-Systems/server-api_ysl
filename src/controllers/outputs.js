import { prismaClient } from '../index.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { ConflictExceptions } from '../exceptions/conflict.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';
import { AddOutputScheme, ChangeNameOutputScheme, ChangeParametersOutputScheme } from '../schema/outputs.js';

export const addOutput = async (req, res) => {
  AddOutputScheme.parse(req.body);

  const { system_id, title, value, mode } = req.body;

  const outputExisting = await prismaClient.output.findMany({
    where: { system_id, value },
  });

  if (outputExisting.length) {
    throw new ConflictExceptions(ErrorMessage.CONFLICT_OUTPUTS, ErrorCode.CONFLICT_OUTPUTS);
  }

  await prismaClient.output.create({
    data: { system_id, title, value, mode },
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

  res.status(201).json(systemsResponse);
};

export const changeNameOutput = async (req, res) => {
  ChangeNameOutputScheme.parse(req.body);

  const { system_id, value, title } = req.body;

  await prismaClient.output.updateMany({
    where: { system_id, value },
    data: { title },
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

  res.status(201).json(systemsResponse);
};

export const changeParametersOutput = async (req, res) => {
  ChangeParametersOutputScheme.parse(req.body.dataServer);

  const { system_id, value, active, static_value, mode } = req.body.dataServer;

  await prismaClient.output.updateMany({
    where: { system_id, value },
    data: { active, static: static_value, mode },
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

  res.status(201).json(systemsResponse);
};
