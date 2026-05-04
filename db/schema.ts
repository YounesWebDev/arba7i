// --- db/schema.ts ---
import { relations, sql } from "drizzle-orm";
import { pgTable, uuid, varchar, timestamp, boolean, unique, text, primaryKey, integer, decimal, jsonb } from "drizzle-orm/pg-core";

// ==========================================
// THE MULTI-TENANT CORE
// ==========================================

// Users represent authenticated people in the system before they are attached to any specific store context.
export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(), // Exact UUID matched from Supabase Auth system
  email: varchar("email").notNull().unique(), 
  username: varchar("username").unique(), // NEW: For logging in and profile URLs
  firstName: varchar("first_name"), // NEW
  lastName: varchar("last_name"), // NEW
  phoneNumber: varchar("phone_number").unique(), // Make unique so they can log in with it!
  profilePic: text("profile_pic"), // NEW: URL to their avatar image
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Stores are the tenant boundary, so almost every business record can be scoped to one seller account.
export const stores = pgTable("stores", {
  id: uuid("id").defaultRandom().primaryKey(), // Auto-generated UUID
  name: varchar("name").notNull(), // Display name, e.g., 'Tech Store DZ'
  slug: varchar("slug").notNull().unique(), // URL-friendly string, e.g., 'tech-store-dz'
  currency: varchar("currency").default("DZD"), // 3-letter ISO code: 'DZD', 'EUR', 'USD'
  isActive: boolean("is_active").default(true), // true = active, false = suspended/banned
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Seller-store links allow one user to own or manage multiple stores with a per-store role.
export const sellerStoreLinks = pgTable("seller_store_links", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  role: varchar("role").default("owner"), // Values: 'owner', 'manager', 'agent'
  isActive: boolean("is_active").default(true), // true = has access, false = access revoked
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), 
}, (table) => ({
  unq: unique().on(table.userId, table.storeId), 
}));

// ==========================================
// TEAM & ACCESS MANAGEMENT
// ==========================================

// Roles group permissions into reusable job profiles for staff and internal access control.
export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull().unique(), // e.g., 'Confirmation Agent', 'Admin'
  description: text("description"), // e.g., 'Can only view and confirm orders'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), 
});

// Permissions define the atomic actions the platform can allow or deny.
export const permissions = pgTable("permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  actionName: varchar("action_name").notNull().unique(), // e.g., 'delete_product', 'view_profits'
  description: text("description"), // e.g., 'Allows deleting a product from the catalog'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Role-permission links implement many-to-many access rules without duplicating permission data.
export const rolePermissions = pgTable("role_permissions", {
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "cascade" }).notNull(),
  permissionId: uuid("permission_id").references(() => permissions.id, { onDelete: "cascade" }).notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
}));

// Staff records attach a user to a store team so operational access can be managed per store.
export const staff = pgTable("staff", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  roleId: uuid("role_id").references(() => roles.id, { onDelete: "set null" }), 
  isActive: boolean("is_active").default(true), // true = working, false = fired/suspended
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  unq: unique().on(table.storeId, table.userId),
}));

// ==========================================
// THE PRODUCT CATALOG & MEDIA
// ==========================================

// Categories organize a store's catalog for navigation, filtering, and merchandising.
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name").notNull(), // e.g., 'Smartphones', 'Men Clothing'
  slug: varchar("slug").notNull(), // e.g., 'smartphones', 'men-clothing'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  unq_slug: unique().on(table.storeId, table.slug),
}));

// Products hold the main sellable catalog entries, including pricing, inventory, and publishing state.
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
  name: varchar("name").notNull(), // e.g., 'iPhone 15 Pro'
  slug: varchar("slug").notNull(), // NEW: URL-friendly string, e.g., 'iphone-15-pro'
  description: text("description"), // HTML or Markdown product description
  price: decimal("price", { precision: 12, scale: 2 }).notNull(), // e.g., 150000.00
  comparePrice: decimal("compare_price", { precision: 12, scale: 2 }), // The "strikethrough" old price, e.g., 170000.00
  stock: integer("stock").default(0), // Actual physical count: 0, 10, 50
  lowStockThreshold: integer("low_stock_threshold").default(5), // Alerts trigger when stock hits this number
  sku: varchar("sku"), // Stock Keeping Unit barcode/string, e.g., 'IP15-BLK-256'
  status: varchar("status").default("active"), // Values: 'active', 'draft', 'out_of_stock', 'archived'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  unq_sku: unique().on(table.storeId, table.sku),
  unq_slug: unique().on(table.storeId, table.slug), // NEW: Ensure slugs are unique per store
}));

// Product images store gallery assets so storefronts can render product visuals independently of product text.
export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  url: varchar("url").notNull(), // Full URL to Supabase Storage, e.g., 'https://.../image.png'
  storagePath: text("storage_path"), // Relative path inside the storage bucket for cleanup
  isPrimary: boolean("is_primary").default(false), // true = main cover photo, false = gallery photo
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Product options define configurable choice groups such as size, color, or add-ons.
export const productOptions = pgTable("product_options", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name").notNull(), // e.g., 'Size', 'Color', 'Custom Engraving'
  type: varchar("type").notNull(), // Values: 'dropdown', 'radio', 'text', 'textarea'
  values: jsonb("values").$type<string[]>().notNull().default(sql`'[]'::jsonb`), // Selectable values for non-text options
  isRequired: boolean("is_required").default(true), // true = customer MUST fill it out to checkout
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Product variants represent concrete purchasable combinations with their own stock, SKU, or price overrides.
export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name").notNull(), // Specific combo name, e.g., 'Large / Red'
  sku: varchar("sku"), // Specific variant SKU, e.g., 'TSHIRT-L-RED'
  price: decimal("price", { precision: 12, scale: 2 }), // Override price if this variant costs more
  stock: integer("stock").default(0), // Stock specifically for this variant
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Store banners support storefront marketing placements without hardcoding promotional content into the UI.
export const storeBanners = pgTable("store_banners", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title"), // e.g., 'Ramadan Mega Sale!'
  subtitle: varchar("subtitle"), // e.g., 'Up to 50% off on all items'
  imageUrl: varchar("image_url").notNull(), // Storage link for the banner graphic
  buttonText: varchar("button_text"), // e.g., 'Shop Now'
  buttonLink: varchar("button_link"), // e.g., '/category/ramadan-sale'
  position: varchar("position").default("hero"), // Values: 'hero' (top large), 'top_strip' (thin bar), 'promo' (middle)
  isActive: boolean("is_active").default(true), // true = visible, false = hidden
  startsAt: timestamp("starts_at", { withTimezone: true }), // Date to auto-show banner
  endsAt: timestamp("ends_at", { withTimezone: true }), // Date to auto-hide banner
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ==========================================
// CUSTOMERS & ORDERS
// ==========================================

// Customers capture buyer identity and delivery data so repeat orders and risk history can be tracked.
export const customers = pgTable("customers", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  fullName: varchar("full_name").notNull(), // e.g., 'Karim Farid'
  phone: varchar("phone").notNull(), // e.g., '0555123456'
  wilaya: varchar("wilaya").notNull(), // e.g., '16 - Alger'
  commune: varchar("commune").notNull(), // e.g., 'Bab Ezzouar'
  address: text("address"), // Exact street/building details
  riskScore: varchar("risk_score").default("low"), // Values: 'low', 'medium', 'high'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), 
});

// Orders are the commercial transaction records that tie stores, customers, fulfillment, and revenue together.
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  customerId: uuid("customer_id").references(() => customers.id, { onDelete: "restrict" }).notNull(),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }).notNull(), // Final cart total + shipping
  status: varchar("status").default("new"), // Values: 'new', 'pending', 'confirmed', 'canceled', 'shipped', 'delivered', 'returned'
  internalNotes: text("internal_notes"), // Hidden from customer, e.g., 'Customer requested call after 5pm'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Order items preserve the exact products, variants, pricing, and option selections purchased in each order.
export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "restrict" }).notNull(),
  variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
  quantity: integer("quantity").notNull().default(1), // Number of items bought
  price: decimal("price", { precision: 12, scale: 2 }).notNull(), // Snapshot of the price at the time of order
  selectedOptions: jsonb("selected_options"), // e.g., {"Size": "L", "Color": "Black", "Custom Text": "Ahmed"}
});

// ==========================================
// OPERATIONS & RISK
// ==========================================

// Shipments track fulfillment progress and carrier data after an order moves into delivery operations.
export const shipments = pgTable("shipments", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  carrier: varchar("carrier").notNull(), // Values: 'yalidine', 'zr_express', 'self_delivery'
  trackingNumber: varchar("tracking_number"), // Provided by Yalidine/ZR Express
  status: varchar("status").default("processing"), // Values: 'processing', 'shipped', 'delivered', 'returned', 'failed'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Expenses record non-order costs so store profitability can be measured beyond gross sales.
export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  type: varchar("type").notNull(), // Values: 'ads', 'shipping', 'packaging', 'other'
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(), // e.g., 5000.00 spent on FB Ads
  date: timestamp("date", { withTimezone: true }).notNull(), // When the expense occurred
  description: text("description"), // e.g., 'Facebook Ads for May 1st'
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), 
});

// Risk events log suspicious or high-risk customer and order behavior for fraud prevention and operational review.
export const riskEvents = pgTable("risk_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(), 
  customerId: uuid("customer_id").references(() => customers.id, { onDelete: "cascade" }).notNull(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }), 
  reason: text("reason").notNull(), // e.g., 'Customer has 3 prior rejected deliveries'
  severity: varchar("severity").notNull(), // Values: 'low', 'medium', 'high', 'critical'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), 
});

// ==========================================
// SAAS BUSINESS, SUPPORT & LOGS
// ==========================================

// Subscriptions store each merchant's billing plan and feature limits for the SaaS side of the platform.
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  planName: varchar("plan_name").notNull(), // Values: 'free', 'starter', 'pro', 'enterprise'
  status: varchar("status").notNull(), // Values: 'active', 'unpaid', 'canceled', 'expired'
  limits: jsonb("limits"), // e.g., {"max_orders_per_month": 500, "staff_accounts": 3}
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), 
});

// Payments provide a billing ledger for subscription charges, retries, and reconciliation.
export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  subscriptionId: uuid("subscription_id").references(() => subscriptions.id, { onDelete: "set null" }),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(), // e.g., 3000.00 for SaaS monthly fee
  paymentMethod: varchar("payment_method").notNull(), // Values: 'chargily', 'cib', 'bank_transfer'
  status: varchar("status").notNull(), // Values: 'success', 'failed', 'pending'
  transactionReference: varchar("transaction_reference"), // External Chargily or bank ID
  paidAt: timestamp("paid_at", { withTimezone: true }), // When the money actually cleared
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Pixel integrations let stores connect ad platforms for conversion tracking and campaign attribution.
export const pixelIntegrations = pgTable("pixel_integrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  platform: varchar("platform").notNull(), // Values: 'meta', 'tiktok', 'snapchat', 'google_analytics'
  pixelId: varchar("pixel_id").notNull(), // The actual tracker code, e.g., '1234567890'
  isActive: boolean("is_active").default(true), // true = firing events, false = disabled
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(), 
});

// Notifications deliver operational events to users inside the dashboard without relying on email or SMS.
export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  type: varchar("type").notNull(), // Values: 'new_order', 'low_stock', 'billing_alert', 'system'
  title: varchar("title").notNull(), // Short headline, e.g., 'New High-Risk Order'
  message: text("message").notNull(), // Longer description
  isRead: boolean("is_read").default(false), // true = seen, false = highlighted in UI
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Support tickets create a durable helpdesk thread for merchant issues that need tracking and status management.
export const supportTickets = pgTable("support_tickets", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  createdByUserId: uuid("created_by_user_id").references(() => users.id, { onDelete: "restrict" }).notNull(),
  subject: varchar("subject").notNull(), // e.g., 'Issue connecting Yalidine API'
  status: varchar("status").default("open"), // Values: 'open', 'in_progress', 'resolved', 'closed'
  priority: varchar("priority").default("normal"), // Values: 'low', 'normal', 'high', 'urgent'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Support messages store the conversation inside each ticket so both staff and merchants have a history.
export const supportMessages = pgTable("support_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  ticketId: uuid("ticket_id").references(() => supportTickets.id, { onDelete: "cascade" }).notNull(),
  senderUserId: uuid("sender_user_id").references(() => users.id, { onDelete: "restrict" }).notNull(), 
  message: text("message").notNull(), // Chat/email body content
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Audit logs provide an immutable trail of sensitive actions for debugging, accountability, and compliance.
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  storeId: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  action: varchar("action").notNull(), // Specific identifier: 'order_deleted', 'product_updated', 'staff_invited'
  details: text("details"), // JSON or string showing what changed (e.g., 'Changed price from 50 to 45')
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ==========================================
// DRIZZLE RELATIONS (For fetching nested data)
// ==========================================

export const usersRelations = relations(users, ({ many }) => ({
  storeLinks: many(sellerStoreLinks),
  staffRoles: many(staff),
  notifications: many(notifications),
}));

export const storesRelations = relations(stores, ({ many }) => ({
  sellerLinks: many(sellerStoreLinks),
  staff: many(staff),
  categories: many(categories),
  products: many(products),
  banners: many(storeBanners),
  customers: many(customers),
  orders: many(orders),
  expenses: many(expenses),
  tickets: many(supportTickets),
}));

export const sellerStoreLinksRelations = relations(sellerStoreLinks, ({ one }) => ({
  user: one(users, { fields: [sellerStoreLinks.userId], references: [users.id] }),
  store: one(stores, { fields: [sellerStoreLinks.storeId], references: [stores.id] }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  permissions: many(rolePermissions),
  staff: many(staff),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  roles: many(rolePermissions),
}));

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, { fields: [rolePermissions.roleId], references: [roles.id] }),
  permission: one(permissions, { fields: [rolePermissions.permissionId], references: [permissions.id] }),
}));

export const staffRelations = relations(staff, ({ one }) => ({
  store: one(stores, { fields: [staff.storeId], references: [stores.id] }),
  user: one(users, { fields: [staff.userId], references: [users.id] }),
  role: one(roles, { fields: [staff.roleId], references: [roles.id] }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  store: one(stores, { fields: [categories.storeId], references: [stores.id] }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  images: many(productImages),
  options: many(productOptions),
  variants: many(productVariants),
  orderItems: many(orderItems),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));

export const productOptionsRelations = relations(productOptions, ({ one }) => ({
  product: one(products, { fields: [productOptions.productId], references: [products.id] }),
}));

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
  orderItems: many(orderItems),
}));

export const customersRelations = relations(customers, ({ one, many }) => ({
  store: one(stores, { fields: [customers.storeId], references: [stores.id] }),
  orders: many(orders),
  riskEvents: many(riskEvents),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  store: one(stores, { fields: [orders.storeId], references: [stores.id] }),
  customer: one(customers, { fields: [orders.customerId], references: [customers.id] }),
  items: many(orderItems),
  shipments: many(shipments),
  riskEvents: many(riskEvents),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
  variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}));

export const shipmentsRelations = relations(shipments, ({ one }) => ({
  order: one(orders, { fields: [shipments.orderId], references: [orders.id] }),
}));

export const riskEventsRelations = relations(riskEvents, ({ one }) => ({
  store: one(stores, { fields: [riskEvents.storeId], references: [stores.id] }),
  customer: one(customers, { fields: [riskEvents.customerId], references: [customers.id] }),
  order: one(orders, { fields: [riskEvents.orderId], references: [orders.id] }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one, many }) => ({
  store: one(stores, { fields: [supportTickets.storeId], references: [stores.id] }),
  creator: one(users, { fields: [supportTickets.createdByUserId], references: [users.id] }),
  messages: many(supportMessages),
}));

export const supportMessagesRelations = relations(supportMessages, ({ one }) => ({
  ticket: one(supportTickets, { fields: [supportMessages.ticketId], references: [supportTickets.id] }),
  sender: one(users, { fields: [supportMessages.senderUserId], references: [users.id] }),
}));
