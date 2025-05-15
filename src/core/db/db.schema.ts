import { mysqlTable, varchar, mysqlEnum, int } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const SUB_UPD_FREQS = ['daily', 'hourly'] as const;

export const subscriptionsTable = mysqlTable('subscriptions', {
  id: int().autoincrement().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  city: varchar({ length: 255 }).notNull(),
  frequency: mysqlEnum(SUB_UPD_FREQS).notNull(),
});
