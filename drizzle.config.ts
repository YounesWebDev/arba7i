// --- drizzle.config.ts ---
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// 1. Tell Drizzle to explicitly load your Next.js environment variables
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts", 
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    
    url: process.env.DATABASE_URL!,
  },
});