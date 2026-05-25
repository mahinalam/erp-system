import { z } from 'zod';

import {
  createVariantSchema,
  updateVariantSchema,
} from '../schemas/style-variant.schema';

export type CreateVariantDto = z.infer<typeof createVariantSchema>;

export type UpdateVariantDto = z.infer<typeof updateVariantSchema>;
