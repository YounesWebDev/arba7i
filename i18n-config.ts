// --- i18n-config.ts ---

// We export a constant object named 'i18n'. 
// Think of this as the master dictionary settings for your entire Arba7i app.
export const i18n = {
  // 'defaultLocale' tells Next.js which language to show if the user's browser 
  // doesn't specify one. We are setting it to Arabic ('ar') for the Algerian market.
    defaultLocale: 'ar', 
    
  // 'locales' is an array listing every language your app supports.
  // 'ar' = Arabic, 'en' = English, 'fr' = French.
    locales: ['ar', 'en', 'fr'],
    
// We use 'as const' here. This is a TypeScript trick that locks this object 
// so it cannot be accidentally changed by other parts of your code.
} as const 

// Here, we create a custom TypeScript "Type" called 'Locale'.
// It automatically looks at the array above and says: "A Locale can ONLY be 'ar', 'en', or 'fr'".
// Why? If you accidentally type 'sp' (Spanish) later in your code, TypeScript will catch the typo immediately and warn you!
export type Locale = (typeof i18n)['locales'][number]