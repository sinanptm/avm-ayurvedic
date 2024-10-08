'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetPatientGenderStatics } from "@/lib/hooks/admin/useDashboard"

const GenderChart = () => {
  const { data, error, isLoading } = useGetPatientGenderStatics();

  if (error) return <div>Error loading gender statistics</div>;
  if (!data || isLoading) return <div>Loading...</div>;

  const chartData = [
    { name: 'Male', value: data.statistics.male },
    { name: 'Female', value: data.statistics.female },
    { name: 'Others', value: data.statistics.others },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <>
      <CardHeader>
        <CardTitle>Patient Gender Distribution</CardTitle>
      </CardHeader>
      <ChartContainer
        config={{
          male: { label: "Male", color: COLORS[0] },
          female: { label: "Female", color: COLORS[1] },
          others: { label: "Others", color: COLORS[2] },
        }}
        className="h-[200px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}

export default GenderChart