"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-none rounded-xl border border-border-stealth bg-black/20 px-4 py-3 text-sm placeholder:text-zinc-600 focus:outline-0 focus:ring-1 focus:ring-zinc-500 text-white",
      className
    )}
    {...props}
  />
))
Textarea.displayName = "Textarea"

export { Textarea }
