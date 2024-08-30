import Image from "next/image";
import RegistrationForm from "@/components/forms/patient/RegistrationForm";
import { Banners } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { notFound } from "next/navigation";
const Register = () => {
   const {patientToken} = useAuth();
   if(patientToken){
      notFound();
   }
   
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

               <RegistrationForm />

               <p className="copyright py-12">© 2024 AVM Ayurveda&apos;s</p>
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
};

export default Register;
