// --- db/seed.ts ---
import * as dotenv from "dotenv";

// 1. Load the env file FIRST
dotenv.config({ path: ".env.local" }); 

async function runTest() {
  console.log("⏳ Connecting to database...");

  // 2. Import the database ONLY AFTER the env vars are loaded!
  const { db } = await import("./index");
  const { stores } = await import("./schema");

  try {
    const newStore = await db.insert(stores).values({
      name: "Arba7i Test Store",
      slug: "test-store-01",
      currency: "DZD",
    }).returning(); 

    console.log("✅ SUCCESS! Test Store created:");
    console.log(newStore);

  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }

  process.exit(0);
}

runTest();