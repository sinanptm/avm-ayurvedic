import { ButtonV2 } from "@/components/button/ButtonV2";
import AdminSignInForm from "@/components/forms/admin/SigninForm";
import { Banners } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Signin",
   keywords: ["admin dashboard", "admin signin", "authentication"],
   description: "signin page for avm ayurvedic admin dashboard",
};

const SignIn = () => {
   return (
      <div className="flex h-screen max-h-screen">
         <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-[496px]">
               <Image
                  src={"/assets/icons/logo-full.svg"}
                  width={1000}
                  height={1000}
                  alt="patient"
                  className="mb-12 h-10 w-fit"
               />
               <AdminSignInForm />
               <div className="text-14-regular mt-20 flex justify-between">
                  <p className="justify-items-end text-dark-600 xl:text-left">
                     © {new Date().getFullYear()} AVM Ayurvedic.
                  </p>
                  <ButtonV2 variant={"linkHover2"}>
                     <Link href={"/doctor/slots"} className="text-green-500">
                        Doctor
                     </Link>
                  </ButtonV2>
               </div>
            </div>
         </section>

         <Image src={Banners.admin_signin} height={1000} width={1000} alt="patient" className="side-img max-w-[50%]" />
      </div>
   );
};

export default SignIn;
