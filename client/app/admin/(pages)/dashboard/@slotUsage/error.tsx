"use client";

import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className="flex flex-col items-center justify-center  p-4">
         <h2 className="text-3xl font-semibold mb-4">Something went wrong!</h2>
         <button
            onClick={() => reset()}
            className="bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded-lg transition-colors duration-300"
         >
            Try again
         </button>
      </div>
   );
};

export default Error;
