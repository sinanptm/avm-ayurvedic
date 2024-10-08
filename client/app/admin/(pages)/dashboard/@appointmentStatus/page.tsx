'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell } from "recharts"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetAppointmentsStatisticsByStatus } from "@/lib/hooks/admin/useDashboard"
import { AppointmentStatus } from "@/types/enum"
import Loading from './loading'

export type AppointmentsByStatusStatistics = {
  status: AppointmentStatus
  count: number
}

const AppointmentStatusChart = () => {
  const { data, isLoading, error } = useGetAppointmentsStatisticsByStatus()

  if (error) throw new Error(error.response?.data.message || "Unknown error occurred")
  if (!data || isLoading) return <Loading />

  const chartData = data.statistics.map(stat => ({
    status: stat.status.charAt(0).toUpperCase() + stat.status.slice(1).replace('-', ' '),
    count: stat.count
  }))

  const COLORS = {
    [AppointmentStatus.PAYMENT_PENDING]: "hsl(var(--chart-1))",
    [AppointmentStatus.PENDING]: "hsl(var(--chart-2))",
    [AppointmentStatus.CONFIRMED]: "hsl(var(--chart-3))",
    [AppointmentStatus.CANCELLED]: "hsl(var(--chart-4))",
    [AppointmentStatus.COMPLETED]: "hsl(var(--chart-5))"
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Appointment Status Distribution</CardTitle>
      </CardHeader>
      <ChartContainer
        config={Object.fromEntries(
          Object.entries(AppointmentStatus).map(([key, value]) => [
            value,
            { label: key, color: COLORS[value] }
          ])
        )}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 10 }} />
            <YAxis width={30} tick={{ fontSize: 10 }} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (Array.isArray(value)) {
                      return [`${value.join(', ')}`, name]; 
                    } else {
                      return [`${value} `, name]; 
                    }
                  }}
                />
              }
            />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Bar dataKey="count" name="Appointments">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.status.toLowerCase().replace(' ', '-') as AppointmentStatus]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}

export default AppointmentStatusChart