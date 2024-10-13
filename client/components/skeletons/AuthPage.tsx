import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const AuthSkelton = () => {
   return (
      <div className="flex min-h-screen bg-gray-900 bg-opacity-25 text-white">
         <div className="flex-1 p-8 sm:p-12 md:p-16 lg:p-24 mt-10">
            <div className="mb-8">
               <Skeleton className="h-10 w-32 bg-gray-700" />
            </div>
            <div className="mb-12">
               <Skeleton className="h-12 w-3/4 bg-gray-700" />
            </div>
            <div className="space-y-6">
               <Skeleton className="h-6 w-1/4 bg-gray-700" />
               <Skeleton className="h-12 w-full bg-gray-700" />
               <Skeleton className="h-6 w-1/4 bg-gray-700" />
               <Skeleton className="h-12 w-full bg-gray-700" />
               <Skeleton className="h-12 w-full bg-gray-700" />
            </div>
            <div className="mt-8">
               <Skeleton className="h-6 w-1/3 bg-gray-700" />
            </div>
         </div>

         <div className="hidden md:block md:flex-1">
            <Skeleton className="h-full w-full bg-gray-700" />
         </div>
      </div>
   );
};

export default memo(AuthSkelton);
