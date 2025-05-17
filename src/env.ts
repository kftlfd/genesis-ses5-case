import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(8000),
  DB_URL: z.string(),
  WEATHER_API_URL: z.string().url(),
  WEATHER_API_KEY: z.string(),
  MAILERSEND_API_KEY: z.string(),
  MAILERSEND_DOMAIN: z.string(),
});
export type EnvConfig = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  WEATHER_API_URL: process.env.WEATHER_API_URL,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  MAILERSEND_API_KEY: process.env.MAILERSEND_API_KEY,
  MAILERSEND_DOMAIN: process.env.MAILERSEND_DOMAIN,
} satisfies Record<keyof EnvConfig, string | undefined>);
