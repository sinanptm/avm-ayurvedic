'use client';
import { FormEvent } from 'react'
import OtpVerificationModel from '@/components/models/OtpVerificationModel'

const OptInterceptor = () => {
    const handleResend = ()=>{

    }
    const handleVerify = (e:FormEvent)=>{
        handleVerify
    }

    return <OtpVerificationModel handleResend={handleResend} handleVerify={handleResend} timer={15} key={12} returnRoute='/staff/' />
}

export default OptInterceptor