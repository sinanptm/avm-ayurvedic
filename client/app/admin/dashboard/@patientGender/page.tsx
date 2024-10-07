"use client"

import { } from "recharts"
import { } from "@/components/ui/chart"
import { useGetPatientGenderStatics } from "@/lib/hooks/admin/useDashboard"

const GenderChart = () => {
  const { data, error, isLoading } = useGetPatientGenderStatics();

  if (error) return <div>Error loading gender statistics</div>;
  if (!data || isLoading) return <div>Loading...</div>;

  const chartData = [
    { gender: "male", patients: data.statics.male },
    { gender: "female", patients: data.statics.female },
    { gender: "others", patients: data.statics.others },
  ];

  return (
    <div>GenderChart</div>
  )
}

export default GenderChart;
