'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetAppointmentsByMonth } from '@/lib/hooks/admin/useDashboard'
import { Months } from "@/types/statistics"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"
import Loading from './loading'

const AppointmentsPerMonthChart = () => {
  const { data, isLoading, error } = useGetAppointmentsByMonth();

  if (error) throw new Error(error.response?.data.message || "Unknown error Occurred")
  if (!data || isLoading) return <Loading />;

  const chartData = data.statistics.map(stat => ({
    month: stat.month,
    count: stat.count
  }));

  chartData.sort((a, b) => Object.values(Months).indexOf(a.month as Months) - Object.values(Months).indexOf(b.month as Months));

  return (
    <>
      <CardHeader>
        <CardTitle>Appointments Per Month</CardTitle>
      </CardHeader>
      <ChartContainer
        config={{
          appointments: {
            label: "Appointments",
            color: "hsl(var(--chart-5))",
          },
        }}
        className="h-[300px] sm:h-[400px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => value.substring(0, 3)}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis
              width={40}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value: ValueType) => {
                    if (typeof value === 'number') {
                      return [value.toLocaleString(), "Appointments"];
                    }
                    return [String(value), "Appointments"];
                  }}
                />
              }
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="count"
              name="Appointments"
              stroke="var(--color-appointments)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}

export default AppointmentsPerMonthChart