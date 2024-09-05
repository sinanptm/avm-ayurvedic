import PatientsTable from '@/components/admin/patients/Table'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
  title:"Patients"
}

const page = () => {
  return (
    <main>
      <h1 className='text-5xl font-extrabold '>page</h1>
      <PatientsTable />
    </main>
  )
}

export default page