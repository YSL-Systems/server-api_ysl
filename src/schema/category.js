import { z } from 'zod';

export const ChangeCategoryScheme = z.object({
  newName: z.string().min(2).max(30),
  prevName: z.string().min(2).max(30),
});
