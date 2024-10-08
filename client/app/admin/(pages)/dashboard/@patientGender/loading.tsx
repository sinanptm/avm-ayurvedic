import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GenderChartLoading() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-center justify-center">
          <Skeleton className="h-32 w-32 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}