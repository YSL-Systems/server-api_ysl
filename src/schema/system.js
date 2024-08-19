import { z } from 'zod';

export const ChangeSystemScheme = z.object({
  newName: z.string().min(2).max(30),
  prevName: z.string().min(2).max(30),
});

export const FavoriteSystemScheme = z.object({
  favorite: z.boolean(),
  id: z.string(),
});
