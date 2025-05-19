import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/core/core.module';
import { EmailModule } from '@/email/email.module';

import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubDto } from './dto/create-sub.dto';
import { Response } from 'express';

describe('SubscriptionController', () => {
  let controller: SubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, EmailModule],
      controllers: [SubscriptionsController],
      providers: [SubscriptionsService],
    }).compile();

    controller = module.get<SubscriptionsController>(SubscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create-sub', () => {
    it('should error on invalid input', async () => {
      await expect(
        controller.createSubscription({} as CreateSubDto, {} as Response),
      ).rejects.toThrow();
    });
  });

  describe('confirm-sub', () => {
    it('should error on invalid input', async () => {
      await expect(controller.confirmSub('inv')).rejects.toThrow();
    });
  });

  describe('remove-sub', () => {
    it('should error on invalid input', async () => {
      await expect(controller.removeSub('inv')).rejects.toThrow();
    });
  });
});
