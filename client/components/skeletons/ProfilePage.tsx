import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="overflow-hidden">
      <div className=" p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Skeleton className="h-24 w-24 rounded-full border-4 border-gray-800" />
          <div className="text-center sm:text-left">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Skeleton className="h-10 w-full sm:w-1/3" />
          <Skeleton className="h-10 w-full sm:w-1/3" />
          <Skeleton className="h-10 w-full sm:w-1/3" />
        </div>
      </div>
    </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="ml-4">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex justify-between">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-32" />
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <Skeleton className="h-6 w-64 mb-4" />
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex justify-between items-center mb-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <Skeleton className="h-6 w-64 mb-4" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-32 mb-2" />
        ))}
      </div>
    </div>
  )
}