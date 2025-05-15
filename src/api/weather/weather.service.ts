import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AppConfig } from 'src/core/config/config';
import { z } from 'zod';

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

@Injectable()
export class WeatherService {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly httpService: HttpService,
  ) {}

  async getWeather(city: string) {
    const res = await firstValueFrom(
      this.httpService
        .get(
          `${this.appConfig.env.WEATHER_API_URL}/current.json?key=${this.appConfig.env.WEATHER_API_KEY}&q=${city}`,
        )
        .pipe(
          catchError((err) => {
            console.error(err);
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
