import { Module } from '@nestjs/common';

import { SubscriptionsModule } from '@/api/subscriptions/subscriptions.module';
import { WeatherModule } from '@/api/weather/weather.module';

@Module({
  imports: [WeatherModule, SubscriptionsModule],
})
export class ApiModule {}
