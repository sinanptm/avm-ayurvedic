import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AppointmentStatusChartLoading() {
  return (
    <Card className="w-full border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end justify-between">
          <Skeleton className="h-full w-8" />
          <Skeleton className="h-3/4 w-8" />
          <Skeleton className="h-1/2 w-8" />
          <Skeleton className="h-2/3 w-8" />
          <Skeleton className="h-1/3 w-8" />
        </div>
      </CardContent>
    </Card>
  )
}