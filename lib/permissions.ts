// ============================================================================
// 1. THE PERMISSIONS (What actions can be taken in the app)
// ============================================================================
// We use a TypeScript 'type' here so that if you ever misspell a permission
// later in your code, Next.js will throw an error and warn you.
export type Permission = 
  | "view_dashboard"         // Can the user see the main dashboard page?
  | "manage_store_settings"  // Can they change the store name, domain, etc.?
  | "manage_team"            // Can they invite new staff members or fire them?
  | "manage_products"        // Can they add, edit, or delete items for sale?
  | "view_financials"        // Can they see total profit, revenue, and payouts?
  | "process_orders"         // Can they move an order to 'shipped' or 'delivered'?
  | "confirm_orders"         // Can they call customers to say "Your order is ready"?
  | "manage_inventory"       // Can they update how many items are left in stock?
  | "access_admin";          // Can they enter the platform admin console?

// ============================================================================
// 2. THE ROLES (Who works in the store)
// ============================================================================
// These MUST match the exact spelling of the roles we put in your Drizzle 
// database schema earlier ("owner", "manager", etc.).
export type Role =
  | "owner"
  | "admin"
  | "manager"
  | "confirmation_agent"
  | "warehouse_staff";

// ============================================================================
// 3. THE MATRIX (Connecting Roles to Permissions)
// ============================================================================
// This is a mapping object. It takes a Role, and gives back a list of Permissions.
// We use 'Record<Role, Permission[]>' to force TypeScript to ensure every single 
// Role has a list defined. No one gets left out!
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  
  // The 'owner' is the boss. They get every single permission.
  owner: [
    "view_dashboard",
    "manage_store_settings",
    "manage_team",
    "manage_products",
    "view_financials",
    "process_orders",
    "confirm_orders",
    "manage_inventory",
    "access_admin",
  ],

  // The 'admin' operates the platform with the same application access scope.
  admin: [
    "view_dashboard",
    "manage_store_settings",
    "manage_team",
    "manage_products",
    "view_financials",
    "process_orders",
    "confirm_orders",
    "manage_inventory",
    "access_admin",
  ],
  
  // The 'manager' runs daily operations. They can manage products and orders, 
  // but we hide the sensitive stuff: they CANNOT see the total financials, 
  // and they CANNOT hire/fire people (manage_team).
  manager: [
    "view_dashboard",
    "manage_products",
    "process_orders",
    "confirm_orders",
    "manage_inventory",
  ],
  
  // The 'confirmation_agent' is usually a call center worker. They just need 
  // to log in, look at the dashboard, and click "Confirm" on pending orders.
  confirmation_agent: [
    "view_dashboard",
    "confirm_orders",
  ],
  
  // The 'warehouse_staff' packs the boxes. They need to see what to pack 
  // (process_orders) and update the stock levels (manage_inventory).
  warehouse_staff: [
    "view_dashboard",
    "manage_inventory",
    "process_orders",
  ],
};

// ============================================================================
// 4. THE SECURITY CHECKER (The helper function)
// ============================================================================
// We will use this function all over the app. 
// Example: hasPermission(user.role, "view_financials")
// It will look up the user's role in the Matrix above, check if the permission 
// is in their list, and return 'true' (Yes, let them in) or 'false' (Block them).
export function hasPermission(role: Role, permission: Permission): boolean {
  // We use the optional chaining operator (?.) just in case a user somehow 
  // has a role that doesn't exist. It will safely return false.
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
