import { ReactNode } from "react";

type ChartProps = {
    readonly children: ReactNode;
    readonly patientGender: ReactNode;
    readonly visitors: ReactNode;
    readonly appointmentStatus: ReactNode;
    readonly users: ReactNode;
    readonly appointments: ReactNode;
}

const layout = ({ children, patientGender, appointmentStatus, appointments, users, visitors }: ChartProps) => {
    return (
        <main className="flex-1 space-y-2">
            {children}
            {patientGender}
            {appointmentStatus}
            {appointments}
            {users}
            {visitors}
        </main>
    );
}

export default layout;