'use client'
import { useGetUsersStatics } from "@/lib/hooks/admin/useDashboard";


const page = () => {
  const { data } = useGetUsersStatics();
  console.log(data?.statistics);
  return (
    <div>Users</div>
  )
}

export default page