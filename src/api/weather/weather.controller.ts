import { BadRequestException, Controller, Get, NotFoundException, Query } from '@nestjs/common';

@Controller('api/weather')
export class WeatherController {
  @Get()
  getWeather(@Query('city') city: string) {
    if (!city) {
      throw new BadRequestException('City param is required');
    }

    if (city === 'none') {
      throw new NotFoundException('City not found');
    }

    return {
      temperature: 0,
      humidity: 0,
      description: 'hi ' + city,
    };
  }
}
