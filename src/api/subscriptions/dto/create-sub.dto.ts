import { createZodDto } from 'nestjs-zod';
import { SUB_UPD_FREQS } from 'src/core/db/db.schema';
import { z } from 'zod';

export const createSubscriptionReqBodySchema = z.object({
  email: z.string().email(),
  city: z.string(),
  frequency: z.enum(SUB_UPD_FREQS),
});

export class CreateSubDto extends createZodDto(createSubscriptionReqBodySchema) {}
