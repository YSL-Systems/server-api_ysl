import { z } from 'zod';

export const RegistrationScheme = z.object({
  name: z.string().min(2).max(20),
  phone: z.string().min(12).max(12),
  password: z.string().min(5).max(25),
  role: z.string(),
  topic: z.string(),
  city: z.string(),
  photo: z.string(),
});
