import { ReactNode } from "react";

type ChartProps = {
    readonly patientGender: ReactNode;
    readonly appointmentStatus: ReactNode;
    readonly users: ReactNode;
    readonly appointments: ReactNode;
};

const Layout = ({
    patientGender,
    appointmentStatus,
    appointments,
    users,
}: ChartProps) => {
    return (
        <main className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
            {patientGender}
            {appointmentStatus}
            {appointments}
            {users}
        </main>
    );
};

export default Layout;
