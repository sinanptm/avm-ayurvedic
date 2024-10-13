"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useGetAllSectionsDoctor } from "@/lib/hooks/video/useDoctor";
import { format } from "date-fns";
import { ButtonV2 } from "@/components/button/ButtonV2";
import Link from "next/link";
import { memo, useMemo } from "react";

const VideoSectionsTable = () => {
   const { data: sections, isLoading } = useGetAllSectionsDoctor();

   const renderedSections = useMemo(() => {
      if (isLoading) {
         return Array(5)
            .fill(null)
            .map((_, index) => (
               <TableRow key={index}>
                  <TableCell>
                     <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-4 w-[120px]" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                     <Skeleton className="h-6 w-[80px]" />
                  </TableCell>
               </TableRow>
            ));
      }

      if (sections && sections.length > 0) {
         return sections.map((section) => (
            <TableRow key={section._id}>
               <TableCell>
                  <Image
                     src={section.patientProfile ?? "/assets/icons/default-avatar.png"}
                     alt={section.patientName ?? "Unknown Patient"}
                     width={40}
                     height={40}
                     className="rounded-full object-cover"
                  />
               </TableCell>
               <TableCell>{section.patientName}</TableCell>
               <TableCell>{format(new Date(section.startTime!), "PP, hh:mm a")}</TableCell>
               <TableCell>{format(new Date(section.endTime!), "hh:mm a")}</TableCell>
               <TableCell>
                  <Link href={`/doctor/video-call/${section._id}`} passHref>
                     <ButtonV2 variant="linkHover2">Join Now</ButtonV2>
                  </Link>
               </TableCell>
            </TableRow>
         ));
      }

      return (
         <TableRow>
            <TableCell colSpan={5} className="text-center">
               No sections found.
            </TableCell>
         </TableRow>
      );
   }, [isLoading, sections]);

   return (
      <Card>
         <CardHeader>
            <CardTitle>Upcoming Video Sections</CardTitle>
            <CardDescription>
               A list of the first 10 upcoming video sections, including doctor and patient details.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className="overflow-x-auto">
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className="w-[80px]">Patient</TableHead>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>End Time</TableHead>
                        <TableHead>Action</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>{renderedSections}</TableBody>
               </Table>
            </div>
         </CardContent>
      </Card>
   );
};

export default memo(VideoSectionsTable);
