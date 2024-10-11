"use client";

import { ButtonColorVariant, ButtonV2 } from "@/components/button/ButtonV2";
import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
         <h2 className="text-3xl font-semibold mb-4">Something went wrong!</h2>
         <p>{error.message}</p>
         <ButtonV2
            variant={"ringHover"}
            color={"orange" as ButtonColorVariant}
            onClick={() => reset()}
            className="bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
         >
            Try again
         </ButtonV2>
      </div>
   );
};

export default Error;
