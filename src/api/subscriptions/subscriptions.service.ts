import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { Subscription, subscriptionsTable, UpdateFrequency } from '@/core/db/db.schema';
import { DBService } from '@/core/db/db.service';

import { CreateSubDto } from './dto/create-sub.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly dbService: DBService) {}

  async getAllSubs(): Promise<Subscription[]> {
    return this.dbService.db.select().from(subscriptionsTable);
  }

  async getSub(email: string): Promise<Subscription | null> {
    try {
      const [sub] = await this.dbService.db
        .select()
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.email, email));
      if (!sub) throw new Error('sub not found');
      return sub;
    } catch {
      return null;
    }
  }

  async createSub(inp: CreateSubDto): Promise<Subscription> {
    const [sub] = await this.dbService.db
      .insert(subscriptionsTable)
      .values({ email: inp.email, city: inp.city, frequency: inp.frequency, confirmed: false })
      .returning();
    if (!sub) throw new Error('sub creation failed');
    return sub;
  }

  async confirmSub(token: string) {
    try {
      const [res] = await this.dbService.db
        .update(subscriptionsTable)
        .set({ confirmed: true })
        .where(eq(subscriptionsTable.confirmToken, token))
        .returning();
      return !!res;
    } catch {
      return false;
    }
  }

  async removeSub(token: string) {
    try {
      const [res] = await this.dbService.db
        .delete(subscriptionsTable)
        .where(eq(subscriptionsTable.unsubToken, token))
        .returning();
      return !!res;
    } catch {
      return false;
    }
  }

  async getSubsWithFrequency(freq: UpdateFrequency): Promise<Subscription[]> {
    return this.dbService.db
      .select()
      .from(subscriptionsTable)
      .where(and(eq(subscriptionsTable.confirmed, true), eq(subscriptionsTable.frequency, freq)));
  }
}
