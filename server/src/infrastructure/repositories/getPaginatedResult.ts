import { PaginatedResult } from "../../types";

export const getPaginatedResult = <T>(
   totalItems: number,
   offset: number,
   limit: number,
   items: T[]
): PaginatedResult<T> => {
   const currentPage = Math.floor(offset / limit) + 1;
   const totalPages = Math.ceil(totalItems / limit);
   const hasNextPage = currentPage < totalPages;
   const hasPreviousPage = currentPage > 1;

   return {
      currentPage,
      totalPages,
      hasNextPage,
      hasPreviousPage,
      items,
      totalItems,
   };
};
