import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { z } from 'zod';

import { AppConfig } from '@/core/config/config';

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
  ) {}

  async getWeather(city: string): Promise<WeatherReport> {
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

    return {
      temperature: parsed.current.temp_c,
      humidity: parsed.current.humidity,
      description: parsed.current.condition.text,
    };
  }
}
