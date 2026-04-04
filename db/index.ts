// --- db/index.ts ---
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

// This connection string comes from your Supabase settings
const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it can cause issues with some cloud providers
const client = postgres(connectionString, { prepare: false });

// This 'db' object is what we will use in our pages to read/write data
export const db = drizzle(client, { schema });