import { z } from 'zod';

export const AddTypeSensorScheme = z.object({
  type: z.number().min(1).max(999),
  name: z.string().min(2).max(100),
});

export const DeleteSensorScheme = z.object({
  system_id: z.number().min(1).max(999),
  controller_id: z.number().min(0).max(99),
});

export const ChangeNameSensorScheme = z.object({
  system_id: z.number().min(1).max(999),
  controller_id: z.number().min(0).max(99),
  name: z.string().min(1).max(100),
});

export const AddSensorScheme = z.object({
  system_id: z.number().min(1).max(999),
  type: z.number().min(1).max(999),
  controller_id: z.number().min(0).max(999),
  name: z.string().min(1).max(100),
  address: z.string().max(100),
  status: z.string().max(100),
});
