import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/core/core.module';

import { SubscriptionsService } from './subscriptions.service';

describe('SubscriptionService', () => {
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [SubscriptionsService],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
