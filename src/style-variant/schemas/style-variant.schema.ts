import { z } from 'zod';

export const createVariantSchema = z.object({
  styleId: z.uuid(),

  color: z.string().min(1),

  size: z.string().min(1),

  barcode: z.string().optional(),
});

export const updateVariantSchema = createVariantSchema.partial();
