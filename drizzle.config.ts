import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./db/schema.ts", 
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // We changed this from DATABASE_URL to DIRECT_URL
    url: process.env.DIRECT_URL!,
  },
});