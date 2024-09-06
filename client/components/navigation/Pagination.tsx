import {
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
   Pagination
} from "@/components/ui/pagination";

type Props = {
    handlePageChange:(pageIndex:number)=>void,
    currentPage:number,
    totalPages:number,
    
}

const PaginationComponent = ({currentPage, handlePageChange, totalPages}:Props) => {
   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
                  isActive={currentPage !== 0}
               />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
               <PaginationItem key={index}>
                  <PaginationLink
                     href="#"
                     onClick={() => handlePageChange(index)}
                     className={index === currentPage ? "font-bold" : ""}>
                     {index + 1}
                  </PaginationLink>
               </PaginationItem>
            ))}
            <PaginationItem>
               <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
                  isActive={currentPage !== totalPages - 1}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};

export default PaginationComponent;
