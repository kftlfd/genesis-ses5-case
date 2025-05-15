import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './core/config/config.module';

@Module({
  imports: [ApiModule, ConfigModule],
})
export class AppModule {}
