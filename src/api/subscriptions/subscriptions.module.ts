import { Module } from '@nestjs/common';

import { WeatherModule } from '@/api/weather/weather.module';
import { EmailModule } from '@/email/email.module';

import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsCronService } from './subscriptions.cron';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [EmailModule, WeatherModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsCronService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
