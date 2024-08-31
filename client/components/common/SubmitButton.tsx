import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SubmitButtonProps {
   isLoading: boolean;
   className?: string;
   children: React.ReactNode;
   variant?: "default" | "outline" | "link" | "ghost" | "destructive" | "secondary" | null;
}
const SubmitButton = ({ isLoading, className, children, variant }: SubmitButtonProps) => {
   return (
      <Button type="submit" variant={variant} disabled={isLoading} className={className ?? "shad-primary-btn w-full"}>
         {isLoading ? (
            <div className="flex items-center gap-4">
               <Image src="/assets/icons/loader.svg" alt="loader" width={27} height={27} />
            </div>
         ) : (
            children
         )}
      </Button>
   );
};

export default SubmitButton;
