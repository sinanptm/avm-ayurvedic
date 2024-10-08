'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetSlotStatistics } from "@/lib/hooks/admin/useDashboard"

export type SlotStatistics = {
  time: string;
  count: number;
}

const SlotUsageChart = () => {
  const { data, error, isLoading } = useGetSlotStatistics();

  if (error) return <div>Error loading slot usage statistics</div>;
  if (!data || isLoading) return <div>Loading...</div>;
  
  const sortedData = [...data.statistics].sort((a, b) => {
    const timeA = new Date(`2000-01-01 ${a.time}`);
    const timeB = new Date(`2000-01-01 ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });


  return (
    <>
      <CardHeader>
        <CardTitle>Slot Usage Statistics</CardTitle>
      </CardHeader>
      <ChartContainer
        config={{
          appointments: {
            label: "Appointments",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-[200px] sm:h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tickFormatter={(value) => value.slice(0, 5)}
              interval={5} 
            />
            <YAxis width={30} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar 
              dataKey="count" 
              fill="var(--color-appointments)" 
              name="Appointments"
              radius={[2, 2, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}

export default SlotUsageChart