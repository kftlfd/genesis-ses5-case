import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { subscriptionsTable, TokenModel, UpdateFrequency } from 'src/core/db/db.schema';
import { DBService } from 'src/core/db/db.service';
import { CreateSubDto } from './dto/create-sub.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly dbService: DBService) {}

  async getAllSubs() {
    return this.dbService.db.select().from(subscriptionsTable);
  }

  async getSub(email: string) {
    try {
      const sub = await this.dbService.db
        .select()
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.email, email));
      if (sub.length !== 1) {
        throw new Error(`multiple subs for email <${email}> found`);
      }
      return sub[0];
    } catch {
      return null;
    }
  }

  async createSub(inp: CreateSubDto) {
    const [sub] = await this.dbService.db
      .insert(subscriptionsTable)
      .values({ email: inp.email, city: inp.city, frequency: inp.frequency, confirmed: false })
      .$returningId();
    return sub;
  }

  async confirmSub(t: TokenModel) {
    await this.dbService.db
      .update(subscriptionsTable)
      .set({ confirmed: true })
      .where(eq(subscriptionsTable.id, t.subscription));
  }

  async removeSub(t: TokenModel) {
    await this.dbService.db
      .delete(subscriptionsTable)
      .where(eq(subscriptionsTable.id, t.subscription));
  }

  async getSubsWithFrequency(freq: UpdateFrequency) {
    return this.dbService.db
      .select()
      .from(subscriptionsTable)
      .where(and(eq(subscriptionsTable.confirmed, true), eq(subscriptionsTable.frequency, freq)));
  }
}
