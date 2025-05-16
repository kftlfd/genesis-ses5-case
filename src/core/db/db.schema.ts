import { randomUUID } from 'node:crypto';
import { mysqlTable, varchar, mysqlEnum, int, boolean } from 'drizzle-orm/mysql-core';

export const SUB_UPD_FREQS = ['daily', 'hourly'] as const;
export type UpdateFrequency = (typeof SUB_UPD_FREQS)[number];

export const subscriptionsTable = mysqlTable('subscriptions', {
  id: int().autoincrement().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  city: varchar({ length: 255 }).notNull(),
  frequency: mysqlEnum(SUB_UPD_FREQS).notNull(),
  confirmed: boolean().notNull().default(false),
  confirmToken: varchar({ length: 255 }).notNull().$defaultFn(randomUUID),
  unsubToken: varchar({ length: 255 }).notNull().$defaultFn(randomUUID),
});
export type Subscription = typeof subscriptionsTable.$inferSelect;
