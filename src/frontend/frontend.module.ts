import { Module } from '@nestjs/common';
import { FrontendController } from './frontend.controller';
import { SubscriptionsModule } from 'src/api/subscriptions/subscriptions.module';

@Module({
  imports: [SubscriptionsModule],
  controllers: [FrontendController],
})
export class FrontendModule {}
