import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './core/config/config.module';
import { DBModule } from './core/db/db.module';

@Module({
  imports: [ApiModule, ConfigModule, DBModule],
})
export class AppModule {}
