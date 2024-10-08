import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SlotUsageChartLoading() {
  return (
    <Card className="w-full col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] sm:h-[300px] flex items-end justify-between">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className={`w-6 h-${Math.floor(Math.random() * 16) + 4}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}