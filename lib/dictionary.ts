// --- lib/dictionary.ts ---

// This package ensures this code NEVER runs on the user's browser, keeping your app fast and secure.
import 'server-only'

// We import the Locale type we created so TypeScript knows exactly which languages are allowed.
import type { Locale } from '../i18n-config'

// This object holds instructions on how to load each file.
// The 'import()' function here is special: it only loads the JSON file IF it is explicitly requested.
const dictionaries = {
    en: () => import('../dictionaries/en.json').then((module) => module.default),
    fr: () => import('../dictionaries/fr.json').then((module) => module.default),
    ar: () => import('../dictionaries/ar.json').then((module) => module.default),
}

// This is the main function we will use in our pages. 
// Give it a locale (like 'ar'), and it returns the correct dictionary!
export const getDictionary = async (locale: Locale) => dictionaries[locale]()