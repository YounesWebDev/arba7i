// --- app/(admin)/admin/page.tsx ---

import { getAdminDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";

export default async function AdminHomePage() {
  // Get default locale
  const dict = await getAdminDictionary(i18n.defaultLocale as Locale);

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">{dict.adminPage.title}</h1>
          <p className="text-slate-400 mt-2">{dict.adminPage.description}</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 font-medium mb-2">{dict.adminPage.totalActiveSellers}</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 font-medium mb-2">{dict.adminPage.platformRevenue}</h3>
          <p className="text-3xl font-bold text-white">0 DZD</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 font-medium mb-2">{dict.adminPage.systemStatus}</h3>
          <p className="text-3xl font-bold text-emerald-400">{dict.adminPage.statusOnline}</p>
        </div>
      </div>
    </div>
  )
}
