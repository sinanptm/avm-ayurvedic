"use client";
import Image from "next/image";
import RegistrationForm from "@/components/forms/patient/RegistrationForm";
import { useGetPatientProfile } from "@/lib/hooks/patient/usePatient";
import { Banners } from "@/constants";
import { notFound } from "next/navigation";
import AuthSkelton from "@/components/skeletons/AuthPage";

const Register = () => {
   const { data, isError, isLoading, refetch } = useGetPatientProfile();

   if(isLoading){
      return <AuthSkelton />
   }


   if (!data?.bloodGroup&&!isError) {
      return (
         <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
               <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                  <Image
                     src="/assets/icons/logo-full.svg"
                     height={1000}
                     width={1000}
                     alt="patient"
                     className="mb-12 h-10 w-fit"
                  />

                  <RegistrationForm refetch={refetch} />

                  <p className="copyright py-12">© {new Date().getFullYear()} AVM Ayurvedic.</p>
               </div>
            </section>

            <Image
               src={Banners.patient_register}
               height={1000}
               width={1000}
               alt="patient"
               className="side-img max-w-[390px]"
            />
         </div>
      );
   }
   notFound()
};

export default Register;
