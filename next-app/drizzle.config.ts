import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './packages/db/src',
  schema: './packages/db/src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  migrations: {
    table: 'migration',
    schema: 'public',
  },
});
