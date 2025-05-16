import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './core/config/config.module';
import { DBModule } from './core/db/db.module';
import { EmailModule } from './core/email/email.module';

@Module({
  imports: [ApiModule, ConfigModule, DBModule, ScheduleModule.forRoot(), EmailModule],
})
export class AppModule {}
