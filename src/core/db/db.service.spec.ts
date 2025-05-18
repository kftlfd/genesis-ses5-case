import { Test, TestingModule } from '@nestjs/testing';

import { AppConfig } from '../config/config';
import { DBService } from './db.service';

describe('DbService', () => {
  let service: DBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppConfig, DBService],
    }).compile();

    service = module.get<DBService>(DBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
