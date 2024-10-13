import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const ChatLayoutSkeleton = () => {
   return (
      <div className="flex h-[calc(100vh-4rem)]">
         <aside className="hidden sm:block w-64 md:w-80 border-r border-border overflow-hidden flex-shrink-0">
            <div className="flex flex-col h-full bg-background">
               <div className="p-3 border-b space-y-3">
                  <Skeleton className="h-8 w-full" />
               </div>
               <div className="flex-grow p-2 space-y-2">
                  {[...Array(5)].map((_, i) => (
                     <div key={i} className="flex items-center space-x-2 p-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-1 flex-1">
                           <Skeleton className="h-4 w-3/4" />
                           <Skeleton className="h-3 w-1/2" />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </aside>
         <main className="flex-1 overflow-hidden">
            <div className="flex flex-col h-full bg-background">
               <header className="p-4 border-b border-border flex-shrink-0">
                  <div className="flex items-center space-x-4">
                     <Skeleton className="h-10 w-10 rounded-full" />
                     <div className="space-y-1">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-24" />
                     </div>
                  </div>
               </header>
               <div className="flex-grow p-4 space-y-4">
                  {[...Array(6)].map((_, i) => (
                     <div key={i} className={`flex items-end gap-2 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                        {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                        <div className={`flex flex-col ${i % 2 === 0 ? "items-start" : "items-end"} max-w-[70%]`}>
                           <Skeleton
                              className={`h-16 w-48 rounded-lg ${i % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"}`}
                           />
                           <Skeleton className="h-3 w-16 mt-1" />
                        </div>
                        {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                     </div>
                  ))}
               </div>
               <footer className="border-t border-border p-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                     <Skeleton className="h-10 flex-1" />
                     <Skeleton className="h-10 w-10" />
                     <Skeleton className="h-10 w-20" />
                  </div>
               </footer>
            </div>
         </main>
      </div>
   );
};

export default memo(ChatLayoutSkeleton);
