import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './core/config/config.module';
import { DBModule } from './core/db/db.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ApiModule, ConfigModule, DBModule, ScheduleModule.forRoot()],
})
export class AppModule {}
