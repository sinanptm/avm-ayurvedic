"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormMessage } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/button/SubmitButton";
import { signinFormValidation } from "@/components/forms/actions/adminValidation";
import { FormFieldType } from "@/types/enum";
import Link from "next/link";
import { useSignInDoctor } from "@/lib/hooks/doctor/useDoctorAuth";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ForgotPasswordModalDoctor from "./ForgetPasswordForm";

const AdminSigninForm = () => {
   const form = useForm<z.infer<typeof signinFormValidation>>({
      resolver: zodResolver(signinFormValidation),
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const { mutate: signin, isPending } = useSignInDoctor();
   const { setCredentials } = useAuth();
   const router = useRouter();
   const [isForgetPasswordModelOpen, setForgetPasswordModelOpen] = useState(false);

   const onSubmit = async (values: z.infer<typeof signinFormValidation>) => {
      signin(values, {
         onSuccess: () => {
            toast({
               title: "Signin Successful",
               description: "Please check you email for otp",
               variant: "success",
            });
            setCredentials("otpMailDoctor", values.email);
            router.push("/doctor/otp-verification");
         },
         onError: (error) => {
            if (error.response?.data.message === "Not Verified") {
               toast({
                  title: "Account Not Verified",
                  description: "Your account is not verified yet. We will notify you via email once it's verified.",
                  variant: "info",
               });
            } else {
               const errorMessage = error.response?.data.message || "Unknown Error Occurred";
               toast({
                  title: "Error in Signin",
                  description: errorMessage,
                  variant: "destructive",
               });
               form.setError("email", {
                  message: errorMessage,
               });
            }
         },
      });
   };

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
               <section className="mb-12 space-y-4">
                  <h1 className="header">Doctor Signin</h1>
                  <p className="text-dark-700">
                     {" "}
                     Don&apos;t have an account?{" "}
                     <Link href={"/doctor/signup"} className="text-sky-600">
                        Signup
                     </Link>
                  </p>
               </section>

               <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email address  *"
                  placeholder="johndoe@gmail.com"
                  iconSrc={"/assets/icons/email.svg"}
               />

               <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.PASSWORD}
                  name="password"
                  label="Password *"
                  placeholder="Enter your password"
               />
               <p
                  className="text-dark-700 text-sm mt-2 cursor-pointer"
                  onClick={() => setForgetPasswordModelOpen(!isForgetPasswordModelOpen)}
               >
                  Forget Password?
               </p>

               <FormMessage className="shad-error" />

               <SubmitButton isLoading={isPending}>Sign In</SubmitButton>
            </form>
         </Form>
         <ForgotPasswordModalDoctor isOpen={isForgetPasswordModelOpen} setIsOpen={setForgetPasswordModelOpen} />
      </>
   );
};

export default AdminSigninForm;
