"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useGetPatientGenderStatics } from "@/lib/hooks/admin/useDashboard";
import Loading from "./loading";

const GenderChart = () => {
   const { data, error, isLoading } = useGetPatientGenderStatics();

   if (error) throw new Error(error.response?.data.message || "Unknown error Occurred");
   if (!data || isLoading) return <Loading />;

   const chartData = [
      { name: "Male", value: data.statistics.male },
      { name: "Female", value: data.statistics.female },
      { name: "Others", value: data.statistics.others },
   ];

   const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"];

   return (
      <>
         <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl">Patient Gender Distribution</CardTitle>
         </CardHeader>
         <ChartContainer
            config={{
               male: { label: "Male", color: COLORS[0] },
               female: { label: "Female", color: COLORS[1] },
               others: { label: "Others", color: COLORS[2] },
            }}
            className="h-[calc(100%-3rem)] w-full"
         >
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie
                     data={chartData}
                     cx="50%"
                     cy="50%"
                     labelLine={false}
                     outerRadius="70%"
                     fill="#8884d8"
                     dataKey="value"
                  >
                     {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend
                     layout="vertical"
                     verticalAlign="middle"
                     align="right"
                     wrapperStyle={{ fontSize: "12px", paddingLeft: "10px" }}
                  />
               </PieChart>
            </ResponsiveContainer>
         </ChartContainer>
      </>
   );
};

export default GenderChart;
