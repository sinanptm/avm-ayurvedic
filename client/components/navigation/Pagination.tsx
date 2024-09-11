import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
   handlePageChange: (pageIndex: number) => void;
   currentPage: number;
   totalPages: number;
   className?: string;
};

export default function PaginationComponent({ currentPage, handlePageChange, totalPages, className }: Props) {
   const getPageRange = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];
      let l;

      range.push(1);

      for (let i = currentPage - delta; i <= currentPage + delta; i++) {
         if (i < totalPages && i > 1) {
            range.push(i);
         }
      }

      range.push(totalPages);
      for (let i of range) {
         if (l) {
            if (i - l === 2) {
               rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
               rangeWithDots.push("...");
            }
         }
         rangeWithDots.push(i);
         l = i;
      }

      return rangeWithDots;
   };

   return (
      <Pagination className={className}>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     handlePageChange(Math.max(currentPage - 1, 1));
                  }}
                  aria-disabled={currentPage === 1}
               />
            </PaginationItem>
            {getPageRange().map((page, index) => (
               <PaginationItem key={index}>
                  {page === "..." ? (
                     <PaginationEllipsis />
                  ) : (
                     <PaginationLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault();
                           handlePageChange(Number(page));
                        }}
                        isActive={currentPage === Number(page)}
                     >
                        {page}
                     </PaginationLink>
                  )}
               </PaginationItem>
            ))}
            <PaginationItem>
               <PaginationNext
                  href="#"
                  onClick={(e) => {
                     e.preventDefault();
                     handlePageChange(Math.min(currentPage + 1, totalPages));
                  }}
                  aria-disabled={currentPage === totalPages}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
}
