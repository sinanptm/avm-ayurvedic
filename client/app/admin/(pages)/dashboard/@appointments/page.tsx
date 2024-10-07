'use client'
import { useGetAppointmentsByMonth } from '@/lib/hooks/admin/useDashboard';
import { AppointmentsPerMonthStatics, Months } from '@/types/statistics';

const page = () => {
  const { data } = useGetAppointmentsByMonth();
  console.log(data?.statistics);


  return (
    <div>appointments</div>
  )
}

export default page