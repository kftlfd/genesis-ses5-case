import { Module } from '@nestjs/common';

import { ConfigModule } from '@/core/config/config.module';
import { DBModule } from '@/core/db/db.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [ConfigModule, DBModule, CacheModule],
})
export class CoreModule {}
