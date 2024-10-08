'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useGetSlotStatistics } from "@/lib/hooks/admin/useDashboard"
import Loading from './loading'
import { AllSlotTimes } from "@/constants"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"

export type SlotStatistics = {
  time: string;
  count: number;
}

const SlotUsageChart = () => {
  const { data, error, isLoading } = useGetSlotStatistics();

  if (error) throw new Error(error.response?.data.message || "Unknown error occurred")
  if (!data || isLoading) return <Loading />

  const statisticsMap = new Map(data.statistics.map(stat => [stat.time, stat.count]));

  const chartData = AllSlotTimes.map(time => ({
    time,
    count: `${statisticsMap.get(time) || 0}`
  }));

  const sortedData = chartData.sort((a, b) => {
    const timeA = new Date(`2000-01-01 ${a.time}`);
    const timeB = new Date(`2000-01-01 ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });

  const formatXAxisTick = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes}`;
  };

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
        className="h-[400px] sm:h-[500px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={formatXAxisTick}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={100}
              tick={{ fontSize: 10 }}
            />
            <YAxis width={30} />
            <ChartTooltip content={
              <ChartTooltipContent
                formatter={(value: ValueType) => {
                  if (typeof value === 'number') {
                    return [value.toLocaleString(), " Appointments"];
                  }
                  return [String(value), " Appointments"];
                }}
              />
            } />
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