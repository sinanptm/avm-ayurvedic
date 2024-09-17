import TabSection from '@/components/view/tab/AppointmentTab'
import { Metadata } from 'next'
import React from 'react'


export const metadata:Metadata = {
    title:"Appointments"
}

const Appointments = () => {
  return (
    <TabSection />
  )
}

export default Appointments