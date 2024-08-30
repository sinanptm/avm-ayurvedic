import { Skeleton } from "@/components/ui/skeleton"

export default function Component() {
  return (
    <div className="w-full min-h-screen p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px] bg-gray-800 bg-opacity-20" />
        <Skeleton className="h-4 w-[300px] bg-gray-800 bg-opacity-20" />
      </div>

      {/* Main content */}
      <div className="space-y-6">
        {/* Section 1 */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-[150px] bg-gray-800 bg-opacity-20" />
          <Skeleton className="h-4 w-full bg-gray-800 bg-opacity-20" />
          <Skeleton className="h-4 w-full bg-gray-800 bg-opacity-20" />
          <Skeleton className="h-4 w-3/4 bg-gray-800 bg-opacity-20" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-[150px] bg-gray-800 bg-opacity-20" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-32 w-full bg-gray-800 bg-opacity-20" />
                <Skeleton className="h-4 w-3/4 bg-gray-800 bg-opacity-20" />
                <Skeleton className="h-4 w-1/2 bg-gray-800 bg-opacity-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-[150px] bg-gray-800 bg-opacity-20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-gray-800 bg-opacity-20" />
            <Skeleton className="h-4 w-full bg-gray-800 bg-opacity-20" />
            <Skeleton className="h-4 w-3/4 bg-gray-800 bg-opacity-20" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-6">
        <Skeleton className="h-8 w-[100px] bg-gray-800 bg-opacity-20" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8 bg-gray-800 bg-opacity-20 rounded-full" />
          <Skeleton className="h-8 w-8 bg-gray-800 bg-opacity-20 rounded-full" />
          <Skeleton className="h-8 w-8 bg-gray-800 bg-opacity-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}