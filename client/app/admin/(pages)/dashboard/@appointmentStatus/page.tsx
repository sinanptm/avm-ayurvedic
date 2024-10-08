'use client';
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import { useGetAppointmentsStatisticsByStatus } from '@/lib/hooks/admin/useDashboard';
import { AppointmentsByStatusStatistics } from '@/types/statistics';
import { AppointmentStatus } from '@/types/enum';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const statusColorMapping: Record<AppointmentStatus, string> = {
  [AppointmentStatus.PAYMENT_PENDING]: "hsl(var(--chart-1))",
  [AppointmentStatus.PENDING]: "hsl(var(--chart-2))",
  [AppointmentStatus.CONFIRMED]: "hsl(var(--chart-3))",
  [AppointmentStatus.CANCELLED]: "hsl(var(--chart-4))",
  [AppointmentStatus.COMPLETED]: "hsl(var(--chart-5))",
};

const AppointmentStatusChart = () => {

  const { data, isLoading, error } = useGetAppointmentsStatisticsByStatus();
  const chartData = data?.statistics.map((item: AppointmentsByStatusStatistics) => ({
    status: item.status,
    count: item.count,
    fill: statusColorMapping[item.status], 
  })) || [];

  if (isLoading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading chart data.</p>;

  return (
    <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>Appointments by Status</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="status">
              <LabelList
                dataKey="status"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: AppointmentStatus) => value}
              />
            </Pie>
          </PieChart>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total appointments for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentStatusChart;
