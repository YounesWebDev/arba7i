// --- app/(admin)/admin/page.tsx ---

export default function AdminHomePage() {
  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Platform Overview</h1>
          <p className="text-slate-400 mt-2">Manage all Arba7i sellers and system performance.</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 font-medium mb-2">Total Active Sellers</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 font-medium mb-2">Platform Revenue</h3>
          <p className="text-3xl font-bold text-white">0 DZD</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <h3 className="text-slate-400 font-medium mb-2">System Status</h3>
          <p className="text-3xl font-bold text-emerald-400">Online</p>
        </div>
      </div>
    </div>
  )
}
