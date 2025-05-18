import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule } from '@/core/config/config.module';
import { DBModule } from '@/core/db/db.module';
import { EmailModule } from '@/core/email/email.module';
import { ApiModule } from '@/api/api.module';
import { FrontendModule } from '@/frontend/frontend.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule,
    DBModule,
    EmailModule,
    ApiModule,
    FrontendModule,
  ],
})
export class AppModule {}
