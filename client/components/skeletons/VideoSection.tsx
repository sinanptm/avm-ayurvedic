import React, { memo } from 'react'
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const VideoCallSkeleton = () =>{
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Card className="flex flex-col items-center justify-center flex-grow bg-transparent border-0 shadow-none">
        <Skeleton className="w-24 h-24 rounded-full mb-8 bg-gray-700" />
        <Skeleton className="h-10 w-3/4 max-w-md mb-6 bg-gray-700" />
        <Skeleton className="h-12 w-48 rounded-full bg-gray-700" />
      </Card>
    </div>
  )
}

export default memo(VideoCallSkeleton);