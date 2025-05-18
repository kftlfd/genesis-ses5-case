import { env, EnvConfig } from '@/env';

export class AppConfig {
  public readonly env: EnvConfig;

  constructor() {
    this.env = env;
  }
}
