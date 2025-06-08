import { Test, TestingModule } from '@nestjs/testing';
import { WeatherCacheService } from './weather-cache.service';

describe('WeatherCacheService', () => {
  let service: WeatherCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherCacheService],
    }).compile();

    service = module.get<WeatherCacheService>(WeatherCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
