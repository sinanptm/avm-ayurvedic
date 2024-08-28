'use client'
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectAdminToken, selectDoctorToken } from '@/lib/features/authSlice';
import { useRouter } from 'next/navigation';

interface WithAuthProps {
  children: ReactNode;
}

const StaffWithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const AdminToken = useSelector(selectAdminToken);
  const DoctorToken = useSelector(selectDoctorToken);
  const router = useRouter();

  if (!AdminToken&&!DoctorToken) {
    if (typeof window !== 'undefined') {
       router.push('/staff/signin');
    }
    return null;
  }

  return <>{children}</>;
};

export default StaffWithAuth;
