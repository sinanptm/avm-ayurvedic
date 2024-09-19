import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileSkeleton() {
   return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
         <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <Card className="overflow-hidden">
               <div className="relative h-48">
                  <Skeleton className="absolute inset-0" />
                  <div className="absolute bottom-6 left-6 flex flex-row items-center space-y-0 space-x-4">
                     <div className="relative">
                        <Skeleton className="h-32 w-32 rounded-full border-4 border-white" />
                        <Skeleton className="absolute bottom-0 right-0 mb-2 mr-2 p-2 rounded-full h-10 w-10" />
                     </div>
                     <div className="text-center sm:text-left">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                     </div>
                  </div>
               </div>
               <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                     <Skeleton className="h-10 flex-1" />
                     <Skeleton className="h-10 flex-1" />
                     <Skeleton className="h-10 flex-1" />
                  </div>
               </CardContent>
            </Card>

            {/* Profile Section Skeleton */}
            <Card className="p-11">
               <Skeleton className="h-10 w-1/4 mb-4" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                     <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-16 w-1/3" />
                        <Skeleton className="h-16 w-1/2" />
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
   );
}
