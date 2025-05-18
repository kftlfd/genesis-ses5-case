import { Module } from '@nestjs/common';

import { SubscriptionsModule } from '@/api/subscriptions/subscriptions.module';

import { FrontendController } from './frontend.controller';

@Module({
  imports: [SubscriptionsModule],
  controllers: [FrontendController],
})
export class FrontendModule {}
