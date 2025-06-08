import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { z } from 'zod';

import { AppConfig } from '@/core/config/config';

import { WeatherCacheService } from './weather-cache.service';

const weatherApiResponseSchema = z.object({
  location: z.object({
    name: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    humidity: z.number(),
    condition: z.object({
      text: z.string(),
    }),
  }),
});

export type WeatherReport = {
  temperature: number;
  humidity: number;
  description: string;
};

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    private readonly appConfig: AppConfig,
    private readonly httpService: HttpService,
    private readonly weatherCacheService: WeatherCacheService,
  ) {}

  async getWeather(city: string): Promise<WeatherReport> {
    const cachedVal = await this.weatherCacheService.get(city);
    if (cachedVal) return cachedVal;

    const res = await firstValueFrom(
      this.httpService
        .get(
          `${this.appConfig.env.WEATHER_API_URL}/current.json?key=${this.appConfig.env.WEATHER_API_KEY}&q=${city}`,
        )
        .pipe(
          catchError((err) => {
            this.logger.error('getWeather', err);
            throw err;
          }),
        ),
    );

    const parsed = weatherApiResponseSchema.parse(res.data);

    const report: WeatherReport = {
      temperature: parsed.current.temp_c,
      humidity: parsed.current.humidity,
      description: parsed.current.condition.text,
    };

    await this.weatherCacheService.set(city, report);

    return report;
  }
}
