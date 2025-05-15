import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeather(city: string) {
    const res = await firstValueFrom(
      this.httpService.get<unknown>(city).pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        }),
      ),
    );
    return res;
  }
}
