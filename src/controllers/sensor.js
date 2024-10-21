import { prismaClient } from '../index.js';
import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { AddSensorScheme, AddTypeSensorScheme, ChangeNameSensorScheme, DeleteSensorScheme } from '../schema/sensor.js';
import { ConflictExceptions } from '../exceptions/conflict.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';
import { UnvalidException } from '../exceptions/unvalid.js';

export const allTypeSensor = async (req, res) => {
  const sensors = await prismaClient.sensorType.findMany({
    where: {},
  });

  const sensorsResponse = await excludeFieldPrisma(sensors, ['created_at', 'updated_at']);

  res.json(sensorsResponse);
};

export const addTypeSensor = async (req, res) => {
  AddTypeSensorScheme.parse(req.body);

  const { type, name } = req.body;

  const sensorExisting = await prismaClient.sensorType.findUnique({
    where: { type },
  });

  if (sensorExisting) {
    throw new ConflictExceptions(ErrorMessage.CONFLICT_SENSOR_TYPE, ErrorCode.CONFLICT_SENSOR_TYPE);
  }

  await prismaClient.sensorType.create({
    data: { type, name },
  });

  res.status(201).json({});
};

export const addSensor = async (req, res) => {
  AddSensorScheme.parse(req.body.dataServer);

  const controller_id = req?.controller_id;

  const { system_id, type, name, address, status } = req.body.dataServer;

  const sensorExisting = await prismaClient.sensor.findMany({
    where: { system_id, controller_id },
  });

  if (sensorExisting.length) {
    throw new ConflictExceptions(ErrorMessage.CONFLICT_SENSOR, ErrorCode.CONFLICT_SENSOR);
  }

  const sensorsDbLength = await prismaClient.sensor.findMany({ where: { system_id } });

  if (sensorsDbLength.length >= 5) {
    throw new UnvalidException(ErrorMessage.SENSORS_UNVALID, ErrorCode.SENSORS_UNVALID);
  }

  await prismaClient.sensor.create({
    data: { system_id, type, controller_id, name, address, status },
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

export const deleteSensor = async (req, res) => {
  DeleteSensorScheme.parse(req.body.dataServer);

  const { system_id, controller_id } = req.body.dataServer;

  await prismaClient.sensor.deleteMany({
    where: { system_id, controller_id },
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

export const changeNameSensor = async (req, res) => {
  ChangeNameSensorScheme.parse(req.body);

  const { system_id, controller_id, name } = req.body;

  await prismaClient.sensor.updateMany({
    where: { system_id, controller_id },
    data: { name },
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
