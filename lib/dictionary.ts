import { cache } from "react";
import "server-only";

import type { Locale } from "@/i18n-config";

// The page dictionaries have different shapes, so the loader needs a flexible return type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DictionaryValue = Record<string, any>;

const dictionaries = {
  common: {
    en: () => import("@/dictionaries/pages/common/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/common/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/common/ar").then((module) => module.default),
  },
  home: {
    en: () => import("@/dictionaries/pages/home/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/home/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/home/ar").then((module) => module.default),
  },
  features: {
    en: () => import("@/dictionaries/pages/features/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/features/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/features/ar").then((module) => module.default),
  },
  pricing: {
    en: () => import("@/dictionaries/pages/pricing/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/pricing/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/pricing/ar").then((module) => module.default),
  },
  about: {
    en: () => import("@/dictionaries/pages/about/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/about/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/about/ar").then((module) => module.default),
  },
  contact: {
    en: () => import("@/dictionaries/pages/contact/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/contact/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/contact/ar").then((module) => module.default),
  },
  help: {
    en: () => import("@/dictionaries/pages/help/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/help/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/help/ar").then((module) => module.default),
  },
  privacy: {
    en: () => import("@/dictionaries/pages/privacy/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/privacy/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/privacy/ar").then((module) => module.default),
  },
  terms: {
    en: () => import("@/dictionaries/pages/terms/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/terms/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/terms/ar").then((module) => module.default),
  },
  auth: {
    en: () => import("@/dictionaries/pages/auth/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/auth/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/auth/ar").then((module) => module.default),
  },
  dashboardLayout: {
    en: () => import("@/dictionaries/pages/dashboardLayout/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/dashboardLayout/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/dashboardLayout/ar").then((module) => module.default),
  },
  dashboard: {
    en: () => import("@/dictionaries/pages/dashboard/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/dashboard/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/dashboard/ar").then((module) => module.default),
  },
  analytics: {
    en: () => import("@/dictionaries/pages/analytics/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/analytics/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/analytics/ar").then((module) => module.default),
  },
  customers: {
    en: () => import("@/dictionaries/pages/customers/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/customers/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/customers/ar").then((module) => module.default),
  },
  orders: {
    en: () => import("@/dictionaries/pages/orders/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/orders/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/orders/ar").then((module) => module.default),
  },
  expenses: {
    en: () => import("@/dictionaries/pages/expenses/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/expenses/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/expenses/ar").then((module) => module.default),
  },
  shipments: {
    en: () => import("@/dictionaries/pages/shipments/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/shipments/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/shipments/ar").then((module) => module.default),
  },
  turbo: {
    en: () => import("@/dictionaries/pages/turbo/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/turbo/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/turbo/ar").then((module) => module.default),
  },
  settings: {
    en: () => import("@/dictionaries/pages/settings/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/settings/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/settings/ar").then((module) => module.default),
  },
  radar: {
    en: () => import("@/dictionaries/pages/radar/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/radar/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/radar/ar").then((module) => module.default),
  },
  categories: {
    en: () => import("@/dictionaries/pages/categories/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/categories/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/categories/ar").then((module) => module.default),
  },
  products: {
    en: () => import("@/dictionaries/pages/products/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/products/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/products/ar").then((module) => module.default),
  },
  notFound: {
    en: () => import("@/dictionaries/pages/notFound/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/notFound/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/notFound/ar").then((module) => module.default),
  },
  unauthorized: {
    en: () => import("@/dictionaries/pages/unauthorized/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/unauthorized/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/unauthorized/ar").then((module) => module.default),
  },
  admin: {
    en: () => import("@/dictionaries/pages/admin/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/admin/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/admin/ar").then((module) => module.default),
  },
  storefront: {
    en: () => import("@/dictionaries/pages/storefront/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/storefront/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/storefront/ar").then((module) => module.default),
  },
} as const;

type DictionarySection = keyof typeof dictionaries;

const getScopedDictionary = cache(
  async (section: DictionarySection, locale: Locale): Promise<DictionaryValue> => {
    return dictionaries[section][locale]();
  }
);

export const getCommonDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("common", locale);
});

export const getHomeDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("home", locale);
});

export const getFeaturesDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("features", locale);
});

export const getPricingDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("pricing", locale);
});

export const getAboutDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("about", locale);
});

export const getContactDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("contact", locale);
});

export const getHelpDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("help", locale);
});

export const getPrivacyDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("privacy", locale);
});

export const getTermsDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("terms", locale);
});

export const getAuthDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("auth", locale);
});

export const getDashboardDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("dashboard", locale);
});

export const getCategoriesDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("categories", locale);
});

export const getProductsDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("products", locale);
});

export const getNotFoundDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("notFound", locale);
});

export const getUnauthorizedDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("unauthorized", locale);
});

export const getAdminDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("admin", locale);
});

export const getStorefrontDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("storefront", locale);
});

export const getDashboardLayoutDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("dashboardLayout", locale);
});

export const getAnalyticsDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("analytics", locale);
});

export const getCustomersDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("customers", locale);
});

export const getOrdersDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("orders", locale);
});

export const getExpensesDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("expenses", locale);
});

export const getShipmentsDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("shipments", locale);
});

export const getTurboDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("turbo", locale);
});

export const getSettingsDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("settings", locale);
});

export const getRadarDictionary = cache(async (locale: Locale) => {
  return getScopedDictionary("radar", locale);
});
