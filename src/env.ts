import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(8000),
  DB_URL: z.string(),
  DB_TABLE_PREFIX: z.string(),
  WEATHER_API_URL: z.string().url(),
  WEATHER_API_KEY: z.string(),
});
export type EnvConfig = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  DB_TABLE_PREFIX: process.env.DB_TABLE_PREFIX,
  WEATHER_API_URL: process.env.WEATHER_API_URL,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
} satisfies Record<keyof EnvConfig, string | undefined>);
