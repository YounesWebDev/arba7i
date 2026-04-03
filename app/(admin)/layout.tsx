// --- app/(admin)/layout.tsx ---

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // We use a dark slate theme here so it is instantly visually distinct 
    // from the white/light-gray Seller Dashboard.
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-50">
      
      {/* Admin Sidebar (Simplified for now) */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 hidden md:block">
        <div className="mb-8">
          <span className="font-bold text-2xl text-white tracking-tight">Arba7i</span>
          <span className="text-xs text-blue-400 block mt-1">Super Admin Console</span>
        </div>
        <nav className="flex flex-col gap-4 text-sm text-slate-300">
          <div className="hover:text-white cursor-pointer transition-colors">Overview</div>
          <div className="hover:text-white cursor-pointer transition-colors">Sellers & Stores</div>
          <div className="hover:text-white cursor-pointer transition-colors">Subscriptions</div>
          <div className="hover:text-white cursor-pointer transition-colors">System Health</div>
        </nav>
      </aside>

      {/* Admin Main Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}