import { z } from 'zod';

export const createStyleSchema = z.object({
  name: z.string().min(1),

  buyerId: z.uuid(),

  season: z.enum(['SS', 'AW']),

  year: z.number(),

  description: z.string().optional(),

  productType: z.string().optional(),

  fabricType: z.string().optional(),

  productImage: z.string().optional(),
});

export const updateStyleSchema = createStyleSchema.partial();
