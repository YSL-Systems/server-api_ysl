import { z } from 'zod';

export const AddSystemScheme = z.object({
  user_id: z.number().min(1).max(999),
  system: z.string().min(2).max(30),
  category: z.string().min(2).max(30),
  name: z.string().min(2).max(30),
});

export const ChangeSystemScheme = z.object({
  newName: z.string().min(2).max(30),
  prevName: z.string().min(2).max(30),
});

export const FavoriteSystemScheme = z.object({
  favorite: z.boolean(),
  id: z.string(),
});
