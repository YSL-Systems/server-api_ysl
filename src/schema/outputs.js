import { z } from 'zod';

export const AddOutputScheme = z.object({
  system_id: z.number().min(1).max(999),
  title: z.string().min(1).max(100),
  value: z.number().min(0).max(999),
  mode: z.number().min(0).max(999),
});

export const ChangeNameOutputScheme = z.object({
  system_id: z.number().min(1).max(999),
  value: z.number().min(0).max(999),
  title: z.string().min(1).max(100),
});

export const ChangeParametersOutputScheme = z.object({
  system_id: z.number().min(1).max(999),
  value: z.number().min(0).max(999),
  active: z.boolean(),
  static_value: z.boolean(),
  mode: z.number().min(0).max(999),
});
