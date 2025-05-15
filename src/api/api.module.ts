import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, WeatherModule],
})
export class ApiModule {}
