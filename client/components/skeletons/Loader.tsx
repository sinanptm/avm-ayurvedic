import Image from "next/image"
import { memo } from "react";

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="relative w-20 h-20">
      <Image
        src="/assets/icons/loader-v2.svg"
        alt="Loading"
        layout="fill"
        className="animate-pulse"
      />
    </div>
  </div>
)

export default memo(Loading);