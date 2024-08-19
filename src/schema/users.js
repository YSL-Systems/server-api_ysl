import { z } from 'zod';

export const SupportScheme = z.object({
  value: z.string().min(2).max(30),
  type: z.string().min(2).max(30),
  name: z.string().min(2).max(30),
  phone: z.string().min(2).max(30),
});
