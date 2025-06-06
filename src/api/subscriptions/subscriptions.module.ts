import { Module } from '@nestjs/common';

import { WeatherModule } from '@/api/weather/weather.module';
import { EmailModule } from '@/email/email.module';

import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsCronService } from './subscriptions.cron';

@Module({
  imports: [EmailModule, WeatherModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsCronService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
