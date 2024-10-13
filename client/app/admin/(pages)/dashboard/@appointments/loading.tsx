import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppointmentsPerMonthChartLoading() {
   return (
      <Card className="w-full col-span-1 md:col-span-2 lg:col-span-3 border-none">
         <CardHeader className="pb-2">
            <CardTitle className="text-lg">
               <Skeleton className="h-6 w-3/4" />
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="h-[300px] sm:h-[400px] flex flex-col justify-between">
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
            </div>
         </CardContent>
      </Card>
   );
}
