'use client'

import React, { useCallback, useMemo, useState } from "react"
import { IDoctor } from "@/types"
import { DoctorCard } from "@/components/patient/clinicians/DoctorCard"
import Pagination from "@/components/navigation/Pagination"

interface DoctorPaginationProps {
  initialData: IDoctor[]
}

export default function DoctorPagination({ initialData }: DoctorPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [data] = useState(initialData) 
  const pageSize = 2

  const totalPages = useMemo(() => Math.ceil(initialData.length / pageSize), [initialData.length, pageSize])

  const paginatedItems = useMemo(() =>
    initialData.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [initialData, currentPage, pageSize]
  )

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }, [totalPages])

  if (initialData.length === 0) {
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
