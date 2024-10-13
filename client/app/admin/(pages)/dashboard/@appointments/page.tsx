"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGetAppointmentsByMonth } from "@/lib/hooks/admin/useDashboard";
import { Months } from "@/types/statistics";
import { ValueType } from "recharts/types/component/DefaultTooltipContent";
import Loading from "./loading";

const AppointmentsPerMonthChart = () => {
   const { data, isLoading, error } = useGetAppointmentsByMonth();

   if (error) throw new Error(error.response?.data.message || "Unknown error Occurred");
   if (!data || isLoading) return <Loading />;

   const chartData = data.statistics.map((stat) => ({
      month: stat.month,
      count: stat.count,
   }));

   chartData.sort(
      (a, b) => Object.values(Months).indexOf(a.month as Months) - Object.values(Months).indexOf(b.month as Months)
   );

   return (
      <>
         <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Appointments Per Month</CardTitle>
         </CardHeader>
         <ChartContainer
            config={{
               appointments: {
                  label: "Appointments",
                  color: "hsl(var(--chart-5))",
               },
            }}
            className="h-full w-full"
         >
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 80 }}>
                  <defs>
                     <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-appointments)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-appointments)" stopOpacity={0.1} />
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                     dataKey="month"
                     tickFormatter={(value) => value.substring(0, 3)}
                     interval={0}
                     angle={-45}
                     textAnchor="end"
                     height={60}
                     tick={{ fontSize: 10 }}
                  />
                  <YAxis width={50} tickFormatter={(value) => value.toLocaleString()} tick={{ fontSize: 10 }} />
                  <ChartTooltip
                     content={
                        <ChartTooltipContent
                           formatter={(value: ValueType) => {
                              if (typeof value === "number") {
                                 return [value.toLocaleString(), " Appointments"];
                              }
                              return [String(value), " Appointments"];
                           }}
                        />
                     }
                  />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Area
                     type="monotone"
                     dataKey="count"
                     name="Appointments"
                     stroke="var(--color-appointments)"
                     fillOpacity={1}
                     fill="url(#colorAppointments)"
                     strokeWidth={2}
                  />
               </AreaChart>
            </ResponsiveContainer>
         </ChartContainer>
      </>
   );
};

export default AppointmentsPerMonthChart;
