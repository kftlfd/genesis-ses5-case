import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { SUB_UPD_FREQS } from '@/core/db/db.schema';

export const createSubscriptionReqBodySchema = z.object({
  email: z.string().email(),
  city: z.string(),
  frequency: z.enum(SUB_UPD_FREQS),
});

export class CreateSubDto extends createZodDto(createSubscriptionReqBodySchema) {}
