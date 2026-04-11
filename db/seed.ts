// --- db/seed.ts ---
import * as dotenv from "dotenv";

// 1. Load the env file FIRST
dotenv.config({ path: ".env.local" }); 

async function runSeed() {
  console.log("⏳ Connecting to database and loading schema...");

  // 2. Import the database ONLY AFTER the env vars are loaded!
  const { db } = await import("./index");
  const schema = await import("./schema");

  try {
    console.log("🌱 Starting full database seed...");

    // A. Get the first user in the database
    const [firstUser] = await db.select().from(schema.users).limit(1);
    if (!firstUser) {
      console.error("❌ No users found! Please register an account in the app first.");
      process.exit(1);
    }
    console.log(`👤 Found user, linking to: ${firstUser.email || firstUser.id}`);

    // B. Create a Store (Using a timestamp for the slug so you can run this multiple times without errors)
    const timestamp = Date.now();
    const [store] = await db.insert(schema.stores).values({
      name: "Arba7i Pro Store",
      slug: `pro-store-${timestamp}`,
      currency: "DZD",
      isActive: true,
    }).returning();
    console.log(`🏪 Created Store: ${store.name}`);

    // C. Link the Store to the User (Crucial for the dashboard to see it)
    await db.insert(schema.sellerStoreLinks).values({
      userId: firstUser.id,
      storeId: store.id,
      role: "owner",
    });

    // D. Create Customers
    const [customer1, customer2] = await db.insert(schema.customers).values([
      { storeId: store.id, fullName: "Karim Farid", phone: "0555123456", wilaya: "16 - Alger", commune: "Bab Ezzouar" },
      { storeId: store.id, fullName: "Amina Yelles", phone: "0777987654", wilaya: "31 - Oran", commune: "Es Senia" }
    ]).returning();

    // E. Create Categories & Products
    const [category] = await db.insert(schema.categories).values({
      storeId: store.id, name: "Electronics", slug: `electronics-${timestamp}`
    }).returning();

    await db.insert(schema.products).values([
      { storeId: store.id, categoryId: category.id, name: "AirPods Pro", price: "35000", stock: 50, status: "active" },
      { storeId: store.id, categoryId: category.id, name: "Smart Watch", price: "12000", stock: 15, status: "active" }
    ]).returning();
    console.log(`📦 Created Products`);

    // F. Create Orders
    const [order1] = await db.insert(schema.orders).values([
      { storeId: store.id, customerId: customer1.id, totalAmount: "35000", status: "delivered" },
      { storeId: store.id, customerId: customer2.id, totalAmount: "12000", status: "new" },
      { storeId: store.id, customerId: customer1.id, totalAmount: "47000", status: "new" },
    ]).returning();
    console.log(`🛒 Created Orders`);

    // G. Create a Risk Event
    await db.insert(schema.riskEvents).values({
      storeId: store.id,
      customerId: customer2.id,
      orderId: order1.id,
      reason: "Suspiciously large order from new customer",
      severity: "medium",
    });

    console.log("✅ SUCCESS! Database fully seeded. Your dashboard is now alive.");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }

  process.exit(0);
}

runSeed();
