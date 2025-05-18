import { Injectable, Logger } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';

import { AppConfig } from '@/core/config/config';

import { subscriptionsTable } from './db.schema';

@Injectable()
export class DBService {
  private readonly logger = new Logger(DBService.name);
  public readonly db: ReturnType<typeof drizzle>;

  constructor(private readonly appConfig: AppConfig) {
    this.db = drizzle(appConfig.env.DB_URL);
  }

  async testConnection() {
    try {
      await this.db.select().from(subscriptionsTable).limit(0);
    } catch (err) {
      this.logger.error(err);
      throw new Error('DB connection failed');
    }
  }
}
