import Image from "next/image";
import SignupForm from "@/components/forms/doctor/SignupForm";
import { Banners } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Signup",
};

const Register = () => {
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
               <SignupForm />
               <p className="copyright py-12">© {new Date().getFullYear()} AVM Ayurvedic.</p>
            </div>
         </section>

         <Image
            src={Banners.doctor_signup}
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[390px]"
         />
      </div>
   );
};

export default Register;
