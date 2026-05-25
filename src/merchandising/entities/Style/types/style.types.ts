import { z } from 'zod';
import { createStyleSchema, updateStyleSchema } from '../schemas/style-schema';
// import { createStyleSchema, updateStyleSchema } from '../schemas/style.schema';

export type CreateStyleDto = z.infer<typeof createStyleSchema>;
export type UpdateStyleDto = z.infer<typeof updateStyleSchema>;
