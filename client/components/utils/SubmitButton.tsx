import React from "react";
import { Button } from "@/components/ui/button"
import Image from "next/image";

interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/images/icon/loader.svg"
            alt="loader"
            width={24}
            height={24}
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
