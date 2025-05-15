import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsCronService } from './subscriptions.cron';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsCronService],
})
export class SubscriptionsModule {}
