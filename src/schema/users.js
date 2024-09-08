import { z } from 'zod';

export const SupportMobileScheme = z.object({
  value: z.string().min(2).max(30),
  type: z.string().min(2).max(30),
  name: z.string().min(2).max(30),
  phone: z.string().min(2).max(30),
});

export const SupportSiteScheme = z.object({
  name: z.string().min(2).max(40),
  email: z.string(),
  message: z.string().min(2).max(500),
  phone: z.string().min(0).max(12),
});
