import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";
import { TableSkeletonProps } from "@/types";

export interface ColumnConfig {
   name: string;
   width?: string;
}

const TableSkeleton = ({
   columns,
   rows = 5,
   showHeader = true,
   headerTitle = "",
   headerDescription = "",
}: TableSkeletonProps) => {
   return (
      <Card className="w-full bg-background">
         {showHeader && (
            <CardHeader>
               <CardTitle>{headerTitle ? headerTitle : <Skeleton className="h-8 w-1/4" />}</CardTitle>
               <CardDescription>
                  {headerDescription ? headerDescription : <Skeleton className="h-4 w-3/4" />}
               </CardDescription>
            </CardHeader>
         )}
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow>
                     {columns.map((column, index) => (
                        <TableHead key={index} className={column.width}>
                           {column.name}
                        </TableHead>
                     ))}
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {[...Array(rows)].map((_, rowIndex) => (
                     <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                           <TableCell key={colIndex}>
                              <Skeleton className={`h-6 ${column.width || "w-full"}`} />
                           </TableCell>
                        ))}
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   );
};

export default memo(TableSkeleton);