import { Module } from '@nestjs/common';

import { ConfigModule } from '@/core/config/config.module';
import { DBModule } from '@/core/db/db.module';

@Module({
  imports: [ConfigModule, DBModule],
})
export class CoreModule {}
