import { randomUUID } from 'node:crypto';
import { mysqlTable, varchar, mysqlEnum, int, boolean } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const SUB_UPD_FREQS = ['daily', 'hourly'] as const;

export type UpdateFrequency = (typeof SUB_UPD_FREQS)[number];

export const subscriptionsTable = mysqlTable('subscriptions', {
  id: int().autoincrement().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  city: varchar({ length: 255 }).notNull(),
  frequency: mysqlEnum(SUB_UPD_FREQS).notNull(),
  confirmed: boolean().default(false),
});

const TOKEN_TYPES = ['confirm-sub', 'unsub'] as const;

export type TokenType = (typeof TOKEN_TYPES)[number];

export const tokensTable = mysqlTable('tokens', {
  token: varchar({ length: 255 }).$defaultFn(randomUUID).primaryKey(),
  subscription: int()
    .notNull()
    .references(() => subscriptionsTable.id, { onDelete: 'cascade' }),
  type: mysqlEnum(TOKEN_TYPES).notNull(),
});

export type TokenModel = typeof tokensTable.$inferSelect;
