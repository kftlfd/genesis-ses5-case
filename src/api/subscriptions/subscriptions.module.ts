import { Module } from '@nestjs/common';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsCronService } from './subscriptions.cron';
import { WeatherModule } from '../weather/weather.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [WeatherModule, TokensModule],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsCronService],
})
export class SubscriptionsModule {}
