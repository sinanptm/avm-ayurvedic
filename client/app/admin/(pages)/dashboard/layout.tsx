import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Metadata } from "next"

type ChartProps = {
    readonly patientGender: ReactNode
    readonly appointmentStatus: ReactNode
    readonly users: ReactNode
    readonly appointments: ReactNode
    readonly slotUsage: ReactNode
}

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
}: ChartProps) => {

    return (
        <div className="flex h-screen remove-scrollbar">
            <div className="flex-1 flex flex-col overflow-hidden ">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 remove-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                            <CardContent className="p-0">
                                {appointments}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-0">
                                {patientGender}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-0">
                                {appointmentStatus}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-0">
                                {users}
                            </CardContent>
                        </Card>
                        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                            <CardContent className="p-0">
                                {slotUsage}
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout