import { env, EnvConfig } from '@/env';

export class AppConfig {
  public readonly env: EnvConfig;
  public readonly appBaseUrl;

  constructor() {
    this.env = env;
    this.appBaseUrl = env.APP_BASE_URL ?? `http://${env.HOST}:${env.PORT}`;
  }
}
