import PatientVideoLayout from '@/components/page-components/video/PatientVideoLayout';
import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode; }) => {
    return (
        <PatientVideoLayout>
            {children}
        </PatientVideoLayout>
    )
}

export default layout