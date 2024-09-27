"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/button/SubmitButton";
import { signinFormValidation } from "@/components/forms/actions/userValidation";
import Link from "next/link";
import { FormFieldType } from "@/types/enum";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSignInPatient } from "@/lib/hooks/patient/usePatientAuth";
import { useAuth } from "@/lib/hooks/useAuth";
import ForgetPasswordModel from "@/components/models/patient/ForgetPasswordModel";

const LoginForm = () => {
   const [error, setError] = useState("");
   const { toast } = useToast();
   const router = useRouter();
   const { mutate: signIn, isPending } = useSignInPatient();
   const { setCredentials } = useAuth();
   const [isForgetPasswordOpen, setIsForgetPasswordOpen] = useState(false);

   const form = useForm<z.infer<typeof signinFormValidation>>({
      resolver: zodResolver(signinFormValidation),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async ({ email, password }: z.infer<typeof signinFormValidation>) => {
      signIn(
         { email, password },
         {
            onSuccess() {
               toast({
                  title: "OTP Verification ✅",
                  description: "Please check your email for the OTP.",
                  variant: "default",
               });
               setCredentials("otpMail", email);
               router.push("/signin/otp-verification");
            },
            onError(error) {
               setError(error.response?.data.message || "An error occurred during sign-in.");
               toast({
                  title: "Sign-In Failed ❌",
                  description: error.response?.data.message || "Please try again.",
                  variant: "destructive",
               });
            },
         }
      );
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
               <h1 className="header">Welcome Back 👋</h1>
               <p className="text-dark-700">
                  Schedule your first appointment{" "}
                  <Link href="/signup" className="text-blue-400">
                     Sign Up
                  </Link>
               </p>
            </section>

            <CustomFormField
               control={form.control}
               fieldType={FormFieldType.INPUT}
               name="email"
               label="Email Address"
               placeholder="johndoe@gmail.com"
               iconSrc="/assets/icons/email.svg"
            />

            <CustomFormField
               control={form.control}
               fieldType={FormFieldType.PASSWORD}
               name="password"
               label="Password"
               placeholder="Enter your password"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p
               className="text-dark-700 text-sm mt-2 cursor-pointer"
               onClick={() => setIsForgetPasswordOpen(!isForgetPasswordOpen)}
            >
               Forget Password?
            </p>

            <SubmitButton isLoading={isPending}>Sign In</SubmitButton>
         </form>
         <ForgetPasswordModel isOpen={isForgetPasswordOpen} setIsOpen={setIsForgetPasswordOpen} />
      </Form>
   );
};

export default LoginForm;
