import { z } from 'zod';

export const createBuyerSchema = z.object({
  name: z.string().min(1, 'Name is required'),

  country: z.string().optional(),

  email: z.string().email().optional(),

  phone: z.string().optional(),

  address: z.string().optional(),
});

export const updateBuyerSchema = createBuyerSchema.partial();
