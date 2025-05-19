import { defineConfig } from 'drizzle-kit';

import { env } from '@/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/core/db/db.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DB_URL,
  },
});
