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
  dashboard: {
    en: () => import("@/dictionaries/pages/dashboard/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/dashboard/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/dashboard/ar").then((module) => module.default),
  },
  categories: {
    en: () => import("@/dictionaries/pages/categories/en").then((module) => module.default),
    fr: () => import("@/dictionaries/pages/categories/fr").then((module) => module.default),
    ar: () => import("@/dictionaries/pages/categories/ar").then((module) => module.default),
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
