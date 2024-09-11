"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
   variant?: "default" | "green" | "black" | "light";
};

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
   ({ className, variant = "default", ...props }, ref) => {
      const variantStyles = {
         default: {
            track: "bg-secondary dark:bg-gray-700",
            range: "bg-primary dark:bg-blue-500",
            thumb: "border-primary bg-background dark:bg-gray-600",
         },
         green: {
            track: "bg-green-200 dark:bg-green-700",
            range: "bg-green-500 dark:bg-green-500",
            thumb: "border-green-500 bg-green-200 dark:bg-green-800",
         },
         black: {
            track: "bg-gray-800 dark:bg-gray-900",
            range: "bg-black dark:bg-black",
            thumb: "border-black bg-gray-700 dark:bg-gray-900",
         },
         light: {
            track: "bg-gray-200 dark:bg-gray-300",
            range: "bg-gray-400 dark:bg-gray-500",
            thumb: "border-gray-400 bg-gray-200 dark:bg-gray-400",
         },
      };

      const selectedVariant = variantStyles[variant];

      return (
         <SliderPrimitive.Root
            ref={ref}
            className={cn("relative flex w-full touch-none select-none items-center", className)}
            {...props}
         >
            <SliderPrimitive.Track
               className={cn("relative h-2 w-full grow overflow-hidden rounded-full", selectedVariant.track)}
            >
               <SliderPrimitive.Range className={cn("absolute h-full", selectedVariant.range)} />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
               className={cn(
                  "block h-5 w-5 rounded-full border-2 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  selectedVariant.thumb
               )}
            />
         </SliderPrimitive.Root>
      );
   }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
