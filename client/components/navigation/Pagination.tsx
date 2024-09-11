import {
   Pagination as PaginationSection,
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
   hasPrevPage: boolean;
   hasNextPage: boolean;
};

export default function Pagination({ currentPage, handlePageChange, totalPages, className, hasNextPage, hasPrevPage }: Props) {
   if (totalPages <= 1) return null;

   const getPageRange = () => {
      const delta = 2;
      const range = [];
      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
         range.push(i);
      }
      if (range[0] > 2) range.unshift("...");
      const lastItem = range[range.length - 1];
      if (typeof lastItem === "number" && lastItem < totalPages - 1) {
         range.push("...");
      }
      return [1, ...range, totalPages];
   };

   const handleClick = (e: React.MouseEvent, page: number) => {
      e.preventDefault();
      if (page !== currentPage) handlePageChange(page);
   };

   return (
      <PaginationSection className={className}>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href="#"
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  aria-disabled={!hasPrevPage || currentPage <= 1}
               />
            </PaginationItem>
            {getPageRange().map((page, index) => (
               <PaginationItem key={index}>
                  {page === "..." ? (
                     <PaginationEllipsis />
                  ) : (
                     <PaginationLink
                        href="#"
                        onClick={(e) => handleClick(e, Number(page))}
                        isActive={currentPage === page}
                     >
                        {page}
                     </PaginationLink>
                  )}
               </PaginationItem>
            ))}
            <PaginationItem>
               <PaginationNext
                  href="#"
                  onClick={(e) => handleClick(e, currentPage + 1)}
                  aria-disabled={!hasNextPage || currentPage >= totalPages}
               />
            </PaginationItem>
         </PaginationContent>
      </PaginationSection>
   );
}
