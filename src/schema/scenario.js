import { z } from 'zod';

export const AddScenarioScheme = z.object({
  system_id: z.number().min(1).max(999),
  scenario: z.number().min(1).max(99),
  name: z.string().min(2).max(20),
  configuration: z.object({}),
});

export const DeleteScenarioScheme = z.object({
  system_id: z.number().min(1).max(999),
  scenario: z.number().min(1).max(99),
});

export const ChangeNameScenarioScheme = z.object({
  newName: z.string().min(1).max(30),
  prevName: z.string().min(1).max(30),
  system_id: z.number().min(1).max(999),
});

export const ChangeConfigurationScenarioScheme = z.object({
  scenario: z.number().min(1).max(99),
  configuration: z.object({}),
  system_id: z.number().min(1).max(999),
});
