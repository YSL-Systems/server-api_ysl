import { z } from 'zod';

export const ChangeCategoryScheme = z.object({
  newName: z.string().min(2).max(30),
  prevName: z.string().min(2).max(30),
});

export const AddCategoryScheme = z.object({
  category: z.string().min(2).max(30),
  name: z.string().min(2).max(30),
  image: z.string().min(2).max(30),
  gradient: z.boolean(),
});
