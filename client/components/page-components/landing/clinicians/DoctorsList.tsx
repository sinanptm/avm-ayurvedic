"use client";

import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import { IDoctor } from "@/types/entities";
import DoctorCard from "@/components/page-components/landing/clinicians/DoctorCard";
import Pagination from "@/components/navigation/Pagination";

interface DoctorsListProps {
  initialData: IDoctor[];
}

const DoctorsList = ({ initialData }: DoctorsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(window.innerWidth < 640 ? 2 : 3);
    };

    handleResize(); // Set initial page size
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalPages = useMemo(() => Math.ceil(initialData.length / pageSize), [initialData.length, pageSize]);

  const paginatedItems = useMemo(
    () => initialData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [initialData, currentPage, pageSize]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    },
    [totalPages]
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (initialData.length === 0) {
    return <p className="text-center text-lg mb-16">No doctors available at the moment. Please check back later.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {paginatedItems.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
      <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={currentPage < totalPages}
        hasPrevPage={currentPage > 1}
        className="mb-16"
      />
    </div>
  );
}

export default memo(DoctorsList);