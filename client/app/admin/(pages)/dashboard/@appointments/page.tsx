'use client'
import { useGetAppointmentsByMonth } from '@/lib/hooks/admin/useDashboard';
import { AppointmentsPerMonthStatics, Months } from '@/types/statistics';

const page = () => {
  const { data } = useGetAppointmentsByMonth();

  return (
    <div>appointments</div>
  )
}

export default page