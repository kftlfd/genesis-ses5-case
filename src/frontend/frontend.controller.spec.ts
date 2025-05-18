import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/core/core.module';
import { SubscriptionsModule } from '@/api/subscriptions/subscriptions.module';

import { FrontendController } from './frontend.controller';

describe('FrontendController', () => {
  let controller: FrontendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, SubscriptionsModule],
      controllers: [FrontendController],
    }).compile();

    controller = module.get<FrontendController>(FrontendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
