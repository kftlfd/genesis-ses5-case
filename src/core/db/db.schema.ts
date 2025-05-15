import { mysqlTable, varchar, mysqlEnum, int } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: int().autoincrement().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const subscriptionsTable = mysqlTable('subscriptions', {
  id: int().autoincrement().primaryKey(),
  user: int().references(() => usersTable.id, { onDelete: 'cascade' }),
  city: varchar({ length: 255 }),
  frequency: mysqlEnum(['daily', 'hourly']),
});
