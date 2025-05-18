import { Module } from '@nestjs/common';

import { ConfigModule } from '@/core/config/config.module';
import { DBModule } from '@/core/db/db.module';
import { EmailModule } from '@/core/email/email.module';

@Module({
  imports: [ConfigModule, DBModule, EmailModule],
})
export class CoreModule {}
