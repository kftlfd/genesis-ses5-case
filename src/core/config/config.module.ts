import { Global, Module } from '@nestjs/common';

import { AppConfig } from './config';

@Global()
@Module({
  providers: [AppConfig],
  exports: [AppConfig],
})
export class ConfigModule {}
