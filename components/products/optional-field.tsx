"use client"

import { useState } from "react"

export function OptionalField({ children, label }: { children: React.ReactNode, label: string }) {
  const [skip, setSkip] = useState(false)

  return (
    <div className="space-y-2">
      {/* The fieldset safely disables all inputs inside it when skip is true so the Server Action ignores them */}
      <fieldset disabled={skip} className={`border-0 p-0 m-0 min-w-0 transition-opacity ${skip ? "opacity-40" : "opacity-100"}`}>
        {children}
      </fieldset>
      
      <label className="flex w-fit cursor-pointer items-center gap-2 text-[10px] font-semibold tracking-wider text-muted-foreground hover:text-foreground transition-colors">
        <input 
          type="checkbox" 
          checked={skip} 
          onChange={(e) => setSkip(e.target.checked)} 
          className="h-3 w-3 rounded border-border/60 text-primary focus:ring-primary/40" 
        />
        I do not want to provide a {label}
      </label>
    </div>
  )
}