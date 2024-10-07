'use client'
import { useGetAppointmentsStatisticsByStatus } from '@/lib/hooks/admin/useDashboard';
import { AppointmentsByStatusStatistics } from '@/types/statistics';
import {AppointmentStatus} from '@/types/enum'


const appointmentstatus = () => {
  const { data } = useGetAppointmentsStatisticsByStatus();
  console.log(data?.statistics);

  return (
    <div>appointmentstatus</div>
  )
}

export default appointmentstatus