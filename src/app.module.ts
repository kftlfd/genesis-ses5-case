import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ApiModule } from '@/api/api.module';
import { EmailModule } from '@/email/email.module';
import { FrontendModule } from '@/frontend/frontend.module';

@Module({
  imports: [ScheduleModule.forRoot(), CoreModule, ApiModule, EmailModule, FrontendModule],
})
export class AppModule {}
