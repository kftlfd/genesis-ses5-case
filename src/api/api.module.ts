import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [WeatherModule, SubscriptionsModule],
})
export class ApiModule {}
