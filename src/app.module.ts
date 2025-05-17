import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './core/config/config.module';
import { DBModule } from './core/db/db.module';
import { EmailModule } from './core/email/email.module';
import { FrontendModule } from './frontend/frontend.module';

@Module({
  imports: [
    ConfigModule,
    DBModule,
    EmailModule,
    ApiModule,
    ScheduleModule.forRoot(),
    FrontendModule,
  ],
})
export class AppModule {}
