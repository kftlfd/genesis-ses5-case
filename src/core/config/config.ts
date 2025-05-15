import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DB_URL: z.string(),
  WEATHER_API_URL: z.string().url(),
  WEATHER_API_KEY: z.string(),
});
type EnvConfig = z.infer<typeof envSchema>;

export class AppConfig {
  public readonly env: EnvConfig;

  constructor() {
    this.env = envSchema.parse({
      DB_URL: process.env.DB_URL,
      WEATHER_API_URL: process.env.WEATHER_API_URL,
      WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    } satisfies Partial<EnvConfig>);
  }
}
