import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import { AppConfig } from '../config/config';

@Injectable()
export class DBService {
  public readonly db: ReturnType<typeof drizzle>;

  constructor(private readonly appConfig: AppConfig) {
    this.db = drizzle(appConfig.env.DB_URL);
  }
}
