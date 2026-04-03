import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PublicHomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-primary mb-6 tracking-tight">
          Arba7i
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          The fastest Cash on Delivery (COD) platform for Algerian sellers. 
          Manage orders, track shipments, and calculate real profit in one place.
        </p>
        <div className="flex justify-center gap-4">
          {/* This button links directly to the dashboard we just built! */}
          <Link href="/dashboard">
            <Button size="lg" className="font-semibold">
              Enter Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}