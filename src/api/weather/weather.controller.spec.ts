import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';

import { CoreModule } from '@/core/core.module';

import { CoreModule } from '@/core/core.module';

import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let controller: WeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, HttpModule],
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get-weather', () => {
    it('should error on invalid input', async () => {
      await expect(controller.getWeather('')).rejects.toThrow(BadRequestException);
    });
  });
});
