import { z } from 'zod';
import { createBomSchema, updateBomSchema } from '../schemas/bom-schema';

export type CreateBomDto = z.infer<typeof createBomSchema>;

export type UpdateBomDto = z.infer<typeof updateBomSchema>;
