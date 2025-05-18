import { varchar, pgEnum, serial, boolean, pgTableCreator } from 'drizzle-orm/pg-core';
import { randomUUID } from 'node:crypto';

const pgTable = pgTableCreator((name) => `gses5_${name}`);

export const SUB_UPD_FREQS = ['daily', 'hourly'] as const;
export type UpdateFrequency = (typeof SUB_UPD_FREQS)[number];

export const frequencyEnum = pgEnum('frequency', SUB_UPD_FREQS);

export const subscriptionsTable = pgTable('subscriptions', {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  city: varchar({ length: 255 }).notNull(),
  frequency: frequencyEnum().notNull(),
  confirmed: boolean().notNull().default(false),
  confirmToken: varchar({ length: 255 }).notNull().$defaultFn(randomUUID),
  unsubToken: varchar({ length: 255 }).notNull().$defaultFn(randomUUID),
});
export type Subscription = typeof subscriptionsTable.$inferSelect;
