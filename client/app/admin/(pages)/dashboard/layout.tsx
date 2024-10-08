import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"
import { AdminDashBoardProps } from "@/types"

export const metadata: Metadata = {
    title: "Hospital Statistics Overview | AVM Ayurvedic",
    description: "View detailed hospital statistics, including patient demographics, appointment statuses, user activity, and slot usage. The Admin Dashboard offers a comprehensive overview to manage hospital operations efficiently.",
    keywords: [
       "admin dashboard",
       "hospital statistics",
       "AVM Ayurvedic admin",
       "patient demographics",
       "appointment tracking",
       "user activity",
       "slot usage",
       "hospital management",
       "statistics overview",
       "hospital operations"
    ]
}

const DashboardLayout = ({
    patientGender,
    appointmentStatus,
    appointments,
    users,
    slotUsage
}: AdminDashBoardProps) => {

   return (
    // TODO: user, gender , slot , align issue
        <div className="flex min-h-screen w-full bg-background">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 space-y-4 remove-scrollbar">
                    <Card className="w-full">
                        <CardContent className="p-4 h-[300px] sm:h-[400px] md:h-[500px]">
                            {appointments}
                        </CardContent>
                    </Card>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="p-4 h-[250px] sm:h-[300px]">
                                {patientGender}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 h-[250px] sm:h-[300px]">
                                {appointmentStatus}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 h-[250px] sm:h-[300px]">
                                {users}
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardContent className="p-4 h-[300px] sm:h-[400px] md:h-[500px]">
                            {slotUsage}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout