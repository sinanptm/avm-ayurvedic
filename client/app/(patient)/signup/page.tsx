import SignUnFormSection from "@/components/patient/auth/SignUnPageSection";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "SignUp",
};

const Register = () => {
   return (
      <SignUnFormSection />
   );
};

export default Register;
