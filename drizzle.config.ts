import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';

const DB_URL = z.string({ message: 'Missing DB_URL' }).parse(process.env.DB_URL);

export default defineConfig({
  out: './drizzle',
  schema: './src/core/db/db.schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: DB_URL,
  },
});
