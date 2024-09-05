import PatientsTable from '@/components/admin/patients/Table'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title:"Patients"
}

const page = () => {
  return (
    <main>
      <PatientsTable />
    </main>
  )
}

export default page