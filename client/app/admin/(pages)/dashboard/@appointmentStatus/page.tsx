'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetAppointmentsStatisticsByStatus } from "@/lib/hooks/admin/useDashboard"
import { AppointmentStatus } from "@/types/enum"

const AppointmentStatusChart = () => {
  const { data, isLoading, error } = useGetAppointmentsStatisticsByStatus();

  if (error) return <div>Error loading appointment statistics</div>;
  if (!data || isLoading) return <div>Loading...</div>;

  const chartData = data.statistics.map(stat => ({
    status: stat.status.charAt(0).toUpperCase() + stat.status.slice(1).replace('-', ' '),
    count: stat.count
  }));

  const COLORS = {
    [AppointmentStatus.PAYMENT_PENDING]: "hsl(var(--chart-1))",
    [AppointmentStatus.PENDING]: "hsl(var(--chart-2))",
    [AppointmentStatus.CONFIRMED]: "hsl(var(--chart-3))",
    [AppointmentStatus.CANCELLED]: "hsl(var(--chart-4))",
    [AppointmentStatus.COMPLETED]: "hsl(var(--chart-5))"
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Appointment Status Distribution</CardTitle>
      </CardHeader>
      <ChartContainer
        config={Object.fromEntries(
          Object.entries(AppointmentStatus).map(([key, value]) => [
            value,
            { label: key, color: COLORS[value] }
          ])
        )}
        className="h-[200px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" tick={false} />
            <YAxis width={30} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="count" fill={COLORS[AppointmentStatus.CONFIRMED]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}

export default AppointmentStatusChart