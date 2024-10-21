import { prismaClient } from '../index.js';

import { ErrorCode, ErrorMessage } from '../exceptions/root.js';
import { UnvalidException } from '../exceptions/unvalid.js';
import {
  AddScenarioScheme,
  ChangeConfigurationScenarioScheme,
  ChangeNameScenarioScheme,
  DeleteScenarioScheme,
} from '../schema/scenario.js';
import { excludeFieldPrisma } from '../utils/excludeFieldPrisma.js';

export const allScenario = async (req, res) => {
  const scenarios = await prismaClient.scenario.findMany({
    where: { user_id: req.user.id },
  });

  const systemResponse = await excludeFieldPrisma(scenarios, ['created_at', 'updated_at']);

  res.json(systemResponse);
};

export const addScenario = async (req, res) => {
  AddScenarioScheme.parse(req.body);

  const { system_id, scenario, name, configuration } = req.body;

  const scenarioExisting = await prismaClient.scenario.findFirst({
    where: { system_id, activated: false },
  });

  if (scenarioExisting) {
    await prismaClient.scenario.update({
      where: { id: scenarioExisting.id },
      data: { activated: true, configuration: {}, name: name },
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
  } else {
    const scenariosDbLength = await prismaClient.scenario.findMany({ where: { system_id } });

    if (scenariosDbLength.length >= 30) {
      throw new UnvalidException(ErrorMessage.SCENARIO_UNVALID, ErrorCode.SCENARIO_UNVALID);
    }

    await prismaClient.scenario.create({ data: { system_id, name, scenario, configuration, activated: true } });

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
  }
};

export const deleteScenario = async (req, res) => {
  DeleteScenarioScheme.parse(req.body.dataServer);

  const { system_id, scenario } = req.body.dataServer;

  const scenariosDbLength = await prismaClient.scenario.findMany({ where: { system_id, scenario } });

  if (!scenariosDbLength.length) {
    throw new UnvalidException(ErrorMessage.SCENARIO_NOT_FOUND, ErrorCode.SCENARIO_NOT_FOUND);
  }

  await prismaClient.scenario.updateMany({
    where: { system_id, scenario: scenario },
    data: { activated: false, running: false, configuration: {} },
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

export const changeNameScenario = async (req, res) => {
  ChangeNameScenarioScheme.parse(req.body);

  const { newName, prevName, system_id } = req.body;

  await prismaClient.scenario.updateMany({
    where: { system_id, name: prevName },
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

export const changeConfigurationScenario = async (req, res) => {
  ChangeConfigurationScenarioScheme.parse(req.body.dataServer);

  const { configuration, scenario, system_id } = req.body.dataServer;

  await prismaClient.scenario.updateMany({
    where: { system_id, scenario },
    data: { configuration, running: true },
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
