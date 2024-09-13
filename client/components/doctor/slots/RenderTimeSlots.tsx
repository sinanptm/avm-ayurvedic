"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export const RenderTimeSlots = (
  times: string[],
  label: string,
  selectedSlots: string[],
  isPending: boolean,
  isDeleting: boolean,
  onAddSlot: (slot: string) => void,
  onRemoveSlot: (slot: string) => void,
  onAddAll: () => void,
  onClearAll: () => void
) => (
  <div className="mb-6 rounded-lg p-4 shadow-lg">
    <h2 className="text-lg font-semibold mb-3 text-gray-200">{label}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {times.map((time, index) => (
        <Button
          key={index}
          variant={selectedSlots.includes(time) ? "destructive" : "outline"}
          className={cn(
            "w-full flex items-center justify-between py-2 px-3 text-xs sm:text-sm h-auto",
            "transition-all duration-200 ease-in-out",
            "hover:scale-105",
            selectedSlots.includes(time) 
              ? "bg-red-600  text-white" 
              : "bg-gray-700 text-gray-200"
          )}
          onClick={() => selectedSlots.includes(time) ? onRemoveSlot(time) : onAddSlot(time)}
          disabled={isPending || isDeleting}
        >
          {isPending || isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span>{time}</span>
              {selectedSlots.includes(time) ? (
                <X className="h-4 w-4 ml-2" />
              ) : (
                <PlusCircle className="h-4 w-4 ml-2" />
              )}
            </>
          )}
        </Button>
      ))}
    </div>
    <div className="flex justify-between items-center mt-4">
      <Button
        variant="destructive"
        onClick={onClearAll}
        className="text-xs sm:text-sm px-3 py-2"
      >
        Clear All
      </Button>
      <Button
        variant="default"
        onClick={onAddAll}
        className="text-xs sm:text-sm px-3 py-2 bg-green-600 hover:bg-green-700 text-white"
      >
        Add All
      </Button>
    </div>
  </div>
)