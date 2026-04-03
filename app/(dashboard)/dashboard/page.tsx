// --- app/(dashboard)/dashboard/page.tsx ---
import { getDictionary } from "@/lib/dictionary"
import { SetupChecklist } from "@/components/setup-checklist"

export default async function DashboardHomePage() {
  const dict = await getDictionary('en') 

  return (
    <div className="max-w-4xl">
      {/* 2. Add the checklist to the top of the dashboard */}
      <SetupChecklist /> 
      
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{dict.dashboard.welcome}</h2>
        <p className="text-slate-600">
          {dict.dashboard.description}
        </p>
      </div>
    </div>
  )
}