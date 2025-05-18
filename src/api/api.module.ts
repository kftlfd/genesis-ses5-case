import { Module } from '@nestjs/common';

import { WeatherModule } from '@/api/weather/weather.module';
import { SubscriptionsModule } from '@/api/subscriptions/subscriptions.module';

@Module({
  imports: [WeatherModule, SubscriptionsModule],
})
export class ApiModule {}
