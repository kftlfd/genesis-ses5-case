import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [WeatherModule, SubscriptionsModule, TokensModule],
})
export class ApiModule {}
