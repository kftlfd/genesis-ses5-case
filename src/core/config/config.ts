import { env, EnvConfig } from 'src/env';

export class AppConfig {
  public readonly env: EnvConfig;

  constructor() {
    this.env = env;
  }
}
