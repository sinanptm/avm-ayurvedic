import { Metadata } from "next";
import FormSection from '@/components/(patient)/signin/FormSection'

export const metadata: Metadata = {
   title: "SignIn",
};
const SignIn = () => {
   return (
      <FormSection />
   );
};

export default SignIn;
