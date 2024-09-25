import AppointmentForm from "@/components/forms/patient/AppointmentForm";
import Image from "next/image";
import { Metadata } from "next";
import { Banners } from "@/constants";

export const metadata: Metadata = {
   title: "Book a New Appointment",
   description:
      "Schedule your next appointment with AVM Ayurvedic and get personalized treatment from our expert doctors. Book now for a healthier future.",
   keywords: ["AVM Ayurvedic", "Book Appointment", "Ayurvedic Treatment", "Health and Wellness", "Doctor Appointment"],
};

const Appointment = () => {
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
               <AppointmentForm />
               <p className="copyright py-12">© {new Date().getFullYear()} AVM Ayurvedic.</p>
            </div>
         </section>

         <Image
            src={Banners.patient_newAppointment}
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[390px]"
         />
      </div>
   );
};

export default Appointment;
