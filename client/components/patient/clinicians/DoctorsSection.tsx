'use client'

import React, { useCallback, useMemo, useState } from "react"
import { IDoctor, PaginatedResult } from "@/types"
import { DoctorCard } from "@/components/patient/clinicians/DoctorCard"
import Pagination from "@/components/navigation/Pagination"

interface DoctorPaginationProps {
  initialData: PaginatedResult<IDoctor>
}

export default function DoctorPagination({ initialData }: DoctorPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [data] = useState(initialData)
  const pageSize = 4

  const totalPages = useMemo(() => Math.ceil(data.items.length / pageSize), [data.items.length, pageSize])

  const paginatedItems = useMemo(() => 
    data.items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [data.items, currentPage, pageSize]
  )

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  if (data.items.length === 0) {
    return <p className="text-center text-lg mb-16">No doctors available at the moment. Please check back later.</p>
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
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
  )
}