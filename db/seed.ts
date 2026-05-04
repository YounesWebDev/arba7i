// --- db/seed.ts ---
import * as dotenv from "dotenv";

// 1. Load the env file FIRST
dotenv.config({ path: ".env.local" }); 

// Helper to generate random dates within the last N days
const randomDateLastNDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
  return date;
};

// Helper for random items
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

async function runSeed() {
  console.log("⏳ Connecting to database and loading schema...");

  // 2. Import the database ONLY AFTER the env vars are loaded!
  const { db } = await import("./index");
  const schema = await import("./schema");

  try {
    console.log("🌱 Starting MASSIVE database seed...");

    // A. Get the first user in the database
    const [firstUser] = await db.select().from(schema.users).limit(1);
    if (!firstUser) {
      console.error("❌ No users found! Please register an account in the app first.");
      process.exit(1);
    }
    console.log(`👤 Found user, linking to: ${firstUser.email || firstUser.id}`);

    // B. Create a Store
    const timestamp = Date.now();
    const [store] = await db.insert(schema.stores).values({
      name: "Arba7i Mega Store",
      slug: `mega-store-${timestamp}`,
      currency: "DZD",
      isActive: true,
    }).returning();
    console.log(`🏪 Created Store: ${store.name}`);

    // C. Link the Store to the User
    await db.insert(schema.sellerStoreLinks).values({
      userId: firstUser.id,
      storeId: store.id,
      role: "owner",
    });

    // D. Create 15 Customers
    const wilayas = ["16 - Alger", "31 - Oran", "25 - Constantine", "09 - Blida", "23 - Annaba"];
    const customerData = Array.from({ length: 15 }).map((_, i) => ({
      storeId: store.id,
      fullName: `Customer ${i + 1}`,
      phone: `05550000${i.toString().padStart(2, '0')}`,
      wilaya: getRandom(wilayas),
      commune: "Centre Ville",
      riskScore: Math.random() > 0.8 ? "medium" : "low",
    }));
    const customers = await db.insert(schema.customers).values(customerData).returning();
    console.log(`👥 Created ${customers.length} Customers`);

    // E. Create 8 Categories
    const categoryNames = ["Smartphones", "Laptops", "Audio", "Wearables", "Gaming", "Accessories", "Smart Home", "Cameras"];
    const categoryData = categoryNames.map((name) => ({
      storeId: store.id,
      name,
      slug: `${name.toLowerCase()}-${timestamp}`,
    }));
    const categories = await db.insert(schema.categories).values(categoryData).returning();
    console.log(`📁 Created ${categories.length} Categories`);

    // F. Create 45 Products
    const statuses = ["active", "active", "active", "active", "draft", "out_of_stock"];
    const productData = Array.from({ length: 45 }).map((_, i) => {
      const category = getRandom(categories);
      const status = getRandom(statuses);
      const stock = status === "out_of_stock" ? 0 : randomInt(0, 100);
      const price = randomInt(2000, 150000);
      
      return {
        storeId: store.id,
        categoryId: category.id,
        name: `${category.name} Model ${i + 1} Pro`,
        slug: `product-${category.name.toLowerCase()}-${i + 1}-${timestamp}`,
        description: `This is an amazing ${category.name.toLowerCase()} with premium features.`,
        price: price.toString(),
        comparePrice: Math.random() > 0.5 ? (price * 1.2).toString() : null,
        stock,
        lowStockThreshold: 5,
        sku: `SKU-${category.name.substring(0, 3).toUpperCase()}-${1000 + i}`,
        status,
        createdAt: randomDateLastNDays(30),
      };
    });
    const products = await db.insert(schema.products).values(productData).returning();
    console.log(`📦 Created ${products.length} Products`);

    // G. Create 80 Orders (spread over the last 14 days)
    const orderStatuses = ["new", "new", "pending", "confirmed", "shipped", "delivered", "delivered", "delivered", "returned", "canceled"];
    
    const orderData = Array.from({ length: 80 }).map(() => {
      const customer = getRandom(customers);
      // Pick 1 to 3 random products for this order to calculate a realistic total
      const orderProducts = Array.from({ length: randomInt(1, 3) }).map(() => getRandom(products));
      const totalAmount = orderProducts.reduce((sum, p) => sum + parseFloat(p.price), 0) + 600; // Add 600 DZD shipping

      return {
        storeId: store.id,
        customerId: customer.id,
        totalAmount: totalAmount.toString(),
        status: getRandom(orderStatuses),
        createdAt: randomDateLastNDays(14),
      };
    });
    const orders = await db.insert(schema.orders).values(orderData).returning();
    console.log(`🛒 Created ${orders.length} Orders`);

    // H. Create Order Items (Linking the orders to actual products)
    const orderItemsData = orders.flatMap(order => {
      // Just picking 1 random product per order for the seed to keep it simple
      const product = getRandom(products);
      return {
        orderId: order.id,
        productId: product.id,
        quantity: randomInt(1, 2),
        price: product.price,
      };
    });
    await db.insert(schema.orderItems).values(orderItemsData);

    // I. Create 5 Risk Events
    const riskData = Array.from({ length: 5 }).map(() => {
      const order = getRandom(orders);
      return {
        storeId: store.id,
        customerId: order.customerId,
        orderId: order.id,
        reason: getRandom(["Customer rejected previous orders", "Suspiciously high order value", "Incomplete address details"]),
        severity: getRandom(["low", "medium", "high", "critical"]),
        createdAt: randomDateLastNDays(7),
      };
    });
    await db.insert(schema.riskEvents).values(riskData);
    console.log(`⚠️ Created ${riskData.length} Risk Events`);

    // J. Create Expenses (To show on the Net Profit KPI)
    const expenseData = Array.from({ length: 8 }).map(() => ({
      storeId: store.id,
      type: getRandom(["ads", "shipping", "packaging"]),
      amount: randomInt(1000, 15000).toString(),
      date: randomDateLastNDays(14),
      description: "Business operations expense",
    }));
    await db.insert(schema.expenses).values(expenseData);
    console.log(`💸 Created ${expenseData.length} Expenses`);

    console.log("✅ SUCCESS! Database fully seeded with massive data. Your dashboard is now alive.");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
    process.exit(1);
  }

  process.exit(0);
}

runSeed();
