// --- components/setup-checklist.tsx ---
import { Circle } from "lucide-react"

export function SetupChecklist() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
      <h3 className="text-lg font-bold text-slate-900 mb-2">Store Setup Guide</h3>
      <p className="text-sm text-slate-500 mb-5">
        Complete these steps to start receiving COD orders on Arba7i.
      </p>
      
      <ul className="space-y-4">
        {/* Task 1 */}
        <li className="flex items-center gap-3 text-slate-700">
          <Circle className="w-5 h-5 text-slate-300" />
          <span className="font-medium">Complete store info</span>
        </li>
        
        {/* Task 2 */}
        <li className="flex items-center gap-3 text-slate-700">
          <Circle className="w-5 h-5 text-slate-300" />
          <span className="font-medium">Add your first product</span>
        </li>
        
        {/* Task 3 */}
        <li className="flex items-center gap-3 text-slate-700">
          <Circle className="w-5 h-5 text-slate-300" />
          <span className="font-medium">Connect shipping (Yalidine / ZR Express)</span>
        </li>
      </ul>
    </div>
  )
}