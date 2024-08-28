import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectPatientToken } from '@/lib/features/authSlice';
import { useRouter } from 'next/navigation';

interface WithAuthProps {
  children: ReactNode;
}

const PatientWithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const token = useSelector(selectPatientToken);
  const router = useRouter();

  if (!token) {
    if (typeof window !== 'undefined') {
       router.push('/singin');
    }
    return null;
  }

  return <>{children}</>;
};

export default PatientWithAuth;
