import { CacheService } from '@/core/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { WeatherReport } from './weather.service';

@Injectable()
export class WeatherCacheService {
  private scope = 'weather-report';

  constructor(private readonly cacheService: CacheService) {}

  async get(key: string) {
    const val = await this.cacheService.client.get(`${this.scope}:${key}`);

    return val ? (JSON.parse(val) as WeatherReport) : null;
  }

  async set(key: string, report: WeatherReport) {
    return this.cacheService.client.set(`${this.scope}:${key}`, JSON.stringify(report));
  }
}
