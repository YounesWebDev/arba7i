"use client"

import { useState } from "react"
import { Plus, X, Trash2 } from "lucide-react"
import { productOptions } from "@/db/schema"
import type { VariantBuilderCopy } from "@/components/products/types"

type OptionType = "radio" | "list" | "text"

export type ProductOption = {
  name: string
  type: OptionType
  values: string[]
  isRequired: boolean
}

type ProductOptionRecord = typeof productOptions.$inferSelect & {
  values?: string[] | null
}

export function VariantBuilder({ 
  copy, 
  initialOptions = [] 
}: { 
  copy: VariantBuilderCopy
  initialOptions?: ProductOptionRecord[]
}) {
  // If editing an existing product, map the database data into our state. Otherwise, start empty.
  const [options, setOptions] = useState<ProductOption[]>(
    initialOptions.map(opt => ({
      name: opt.name,
      type: opt.type as OptionType,
      values: opt.values || [], // Make sure values array exists safely
      isRequired: Boolean(opt.isRequired)
    })) || []
  )
  
  const [currentInputs, setCurrentInputs] = useState<Record<number, string>>({})

  const addOption = () => {
    setOptions([...options, { name: "New Option", type: "radio", values: [], isRequired: true }])
  }

  const updateOption = <K extends keyof ProductOption>(index: number, field: K, value: ProductOption[K]) => {
    const newOptions = [...options]
    newOptions[index] = { ...newOptions[index], [field]: value }
    setOptions(newOptions)
  }

  const addValue = (optIndex: number) => {
    const val = currentInputs[optIndex]?.trim()
    if (!val) return

    const newOptions = [...options]
    if (!newOptions[optIndex].values.includes(val)) {
      newOptions[optIndex].values.push(val)
    }
    setOptions(newOptions)
    setCurrentInputs({ ...currentInputs, [optIndex]: "" })
  }

  const removeValue = (optIndex: number, valIndex: number) => {
    const newOptions = [...options]
    newOptions[optIndex].values = newOptions[optIndex].values.filter((_, i) => i !== valIndex)
    setOptions(newOptions)
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Hidden input to pass data securely to Server Action */}
      <input type="hidden" name="options" value={JSON.stringify(options)} />

      {options.map((opt, optIndex) => (
        <div key={optIndex} className="p-4 bg-muted/30 rounded-2xl border border-border/40 relative group">
          <button 
            type="button" 
            onClick={() => removeOption(optIndex)} 
            className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors rtl:right-auto rtl:left-4"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="space-y-4">
            <div className="space-y-2 text-start">
              <label className="text-[10px] font-black text-muted-foreground tracking-wider uppercase">{copy.optionName}</label>
              <input 
                type="text" 
                value={opt.name}
                onChange={(e) => updateOption(optIndex, "name", e.target.value)}
                className="w-full bg-background border-none rounded-2xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/40" 
              />
            </div>

            <div className="space-y-2 text-start">
              <label className="text-[10px] font-black text-muted-foreground tracking-wider uppercase">{copy.type}</label>
              <div className="flex gap-2">
                {(["radio", "list", "text"] as OptionType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateOption(optIndex, "type", type)}
                    className={`flex-1 py-1.5 rounded-2xl text-[10px] font-bold capitalize transition-colors ${
                      opt.type === type 
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-sm" 
                        : "bg-background border border-border/60 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-start">
              <label className="text-[10px] font-black text-muted-foreground tracking-wider uppercase">{copy.values}</label>
              <div className="flex flex-wrap gap-2">
                {opt.values.map((val, valIndex) => (
                  <span key={valIndex} className="bg-background border border-border/60 px-3 py-1 rounded-2xl text-xs flex items-center gap-1 font-medium shadow-sm">
                    {val} 
                    <X className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-destructive ml-1 rtl:ml-0 rtl:mr-1" onClick={() => removeValue(optIndex, valIndex)} />
                  </span>
                ))}
                <input 
                  type="text"
                  value={currentInputs[optIndex] || ""}
                  onChange={(e) => setCurrentInputs({ ...currentInputs, [optIndex]: e.target.value })}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addValue(optIndex); } }}
                  placeholder={copy.addValue}
                  className="bg-transparent border border-dashed border-border/60 rounded-2xl px-3 py-1 text-xs font-medium w-[120px] focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 mt-2 border-t border-border/40">
              <span className="text-xs font-semibold text-foreground">{copy.required}</span>
              <button 
                type="button"
                onClick={() => updateOption(optIndex, "isRequired", !opt.isRequired)}
                className={`w-10 h-5 rounded-full relative p-0.5 transition-colors ${
                  opt.isRequired ? "bg-gradient-to-br from-primary to-accent" : "bg-muted-foreground/30"
                }`}
              >
                <div className={`w-4 h-4 bg-background rounded-full shadow-sm transition-transform ${
                  opt.isRequired ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button 
        type="button" 
        onClick={addOption}
        className="w-full py-4 border-2 border-dashed border-border/60 rounded-2xl text-sm font-bold text-primary flex items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/30 transition-all"
      >
        <Plus className="h-5 w-5" />
        {copy.addOption}
      </button>
    </div>
  )
}
