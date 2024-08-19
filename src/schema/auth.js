import { z } from 'zod';

export const RegistrationScheme = z.object({
  name: z.string().min(2).max(20),
  phone: z.string().min(12).max(12),
  password: z.string().min(3).max(25),
  role: z.string(),
  topic: z.string(),
  city: z.string(),
  photo: z.string(),
});

export const LoginScheme = z.object({
  phone: z.string().min(12).max(12),
  password: z.string().min(3).max(25),
});

export const LogoutScheme = z.object({
  refresh: z.string(),
});

export const RefreshScheme = z.object({
  refresh: z.string(),
});
