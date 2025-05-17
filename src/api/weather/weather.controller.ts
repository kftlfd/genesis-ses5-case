import { BadRequestException, Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string) {
    if (!city) {
      throw new BadRequestException('City param is required');
    }

    try {
      return await this.weatherService.getWeather(city);
    } catch {
      throw new NotFoundException('City not found');
    }
  }
}
