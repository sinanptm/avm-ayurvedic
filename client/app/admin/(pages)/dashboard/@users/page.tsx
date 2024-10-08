'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetUsersStatics } from "@/lib/hooks/admin/useDashboard"
import { Months } from "@/types/statistics";
import Loading from './loading'

const UsersChart = () => {
  const { data, error, isLoading  } = useGetUsersStatics();

  if (error) throw new Error(error.response?.data.message||"Unknown error Occurred")
  if (!data || isLoading) return <Loading />

  const chartData = data.statistics.map(stat => ({
    month: stat.month,
    doctors: stat.doctors,
    patients: stat.patients
  }));

  chartData.sort((a, b) => Object.values(Months).indexOf(a.month as Months) - Object.values(Months).indexOf(b.month as Months));

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">User Growth</CardTitle>
      </CardHeader>
      <ChartContainer
        config={{
          doctors: {
            label: "Doctors",
            color: "hsl(var(--chart-1))",
          },
          patients: {
            label: "Patients",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-full w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => value.substring(0, 3)}
              interval={'preserveStartEnd'}
              tick={{ fontSize: 10 }}
              height={40}
            />
            <YAxis width={30} tick={{ fontSize: 10 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend wrapperStyle={{ fontSize: '10px' }} />
            <Bar dataKey="doctors" stackId="a" fill="var(--color-doctors)" name="Doctors" />
            <Bar dataKey="patients" stackId="a" fill="var(--color-patients)" name="Patients" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}

export default UsersChart