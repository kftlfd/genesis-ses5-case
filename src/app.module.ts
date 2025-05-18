import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CoreModule } from '@/core/core.module';
import { ApiModule } from '@/api/api.module';
import { FrontendModule } from '@/frontend/frontend.module';

@Module({
  imports: [ScheduleModule.forRoot(), CoreModule, ApiModule, FrontendModule],
})
export class AppModule {}
