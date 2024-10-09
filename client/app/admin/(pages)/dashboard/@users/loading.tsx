import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UsersChartLoading() {
  return (
    <Card className="w-full border-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end justify-between">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <Skeleton className="w-8 h-20" />
              <Skeleton className="w-8 h-12" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}