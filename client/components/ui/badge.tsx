import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        secondary:
          "bg-zinc-700 text-zinc-200 hover:bg-zinc-600",
        destructive:
          "bg-red-900 text-red-100 hover:bg-red-800",
        outline: 
          "border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100",
        success:
          "bg-green-900 text-green-100 hover:bg-green-800",
        warning:
          "bg-yellow-900 text-yellow-100 hover:bg-yellow-800",
        info:
          "bg-blue-900 text-blue-100 hover:bg-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }