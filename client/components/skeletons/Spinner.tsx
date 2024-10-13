import Image from "next/image";
import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes, memo, useMemo } from "react";

interface SpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
   size?: "sm" | "md" | "lg";
   color?: "primary" | "secondary" | "muted";
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
   ({ className, size = "md", color = "primary", ...props }, ref) => {
      const colorMap = useMemo(
         () => ({
            primary: "text-primary",
            secondary: "text-secondary",
            muted: "text-muted-foreground",
         }),
         []
      );
      const sizeMap = useMemo(
         () => ({
            sm: "h-4 w-4",
            md: "h-8 w-8",
            lg: "h-12 w-12",
         }),
         []
      );

      const dimensions = useMemo(() => parseInt(sizeMap[size].split(" ")[0].replace("h-", "")) * 4, [size, sizeMap]);

      return (
         <div
            ref={ref}
            className={cn("relative inline-block animate-spin", sizeMap[size], colorMap[color], className)}
            {...props}
         >
            <Image
               src="/assets/icons/loader.svg"
               alt="Loading..."
               width={dimensions}
               height={dimensions}
               className="w-full h-full"
            />
         </div>
      );
   }
);

Spinner.displayName = "Spinner";

export default memo(Spinner);
