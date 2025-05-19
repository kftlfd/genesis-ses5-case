import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  ADMIN_SECRET: z.string().optional(),
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(8000),
  APP_BASE_URL: z.string().optional(),
  DB_URL: z.string(),
  WEATHER_API_URL: z.string().url(),
  WEATHER_API_KEY: z.string(),
  MAILERSEND_API_KEY: z.string(),
  MAILERSEND_DOMAIN: z.string(),
});
export type EnvConfig = z.infer<typeof envSchema>;

export const env: EnvConfig = envSchema.parse({
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  APP_BASE_URL: process.env.APP_BASE_URL,
  DB_URL: process.env.DB_URL,
  WEATHER_API_URL: process.env.WEATHER_API_URL,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  MAILERSEND_API_KEY: process.env.MAILERSEND_API_KEY,
  MAILERSEND_DOMAIN: process.env.MAILERSEND_DOMAIN,
} satisfies Record<keyof EnvConfig, string | undefined>);
