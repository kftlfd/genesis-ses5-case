import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherCacheService } from './weather-cache.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, WeatherCacheService],
  exports: [WeatherService],
})
export class WeatherModule {}
