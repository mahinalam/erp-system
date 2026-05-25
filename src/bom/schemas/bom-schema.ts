import { z } from 'zod';
import { BOMItemType } from '@prisma/client';

export const createBomSchema = z.object({
  styleId: z.string().uuid(),

  itemType: z.nativeEnum(BOMItemType),

  itemName: z.string().min(1),

  consumption: z.number().positive(),

  unit: z.string().min(1),

  supplier: z.string().optional(),
});

export const updateBomSchema = createBomSchema.partial();
