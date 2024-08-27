"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/utils/CustomFormField";
import SubmitButton from "@/components/utils/SubmitButton";
import { signinFormValidation } from "@/lib/validators/userValidation";
import Link from "next/link";
import { FormFieldType } from "@/types/fromTypes";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
   const [error, setError] = useState("");
   const { toast } = useToast();
   const router = useRouter();
   const [isLoading,setLoading] = useState(false);

   const form = useForm<z.infer<typeof signinFormValidation>>({
      resolver: zodResolver(signinFormValidation),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (values: z.infer<typeof signinFormValidation>) => {
      try {
         toast({
            title: "OTP Verification",
            description: "Please check your email for the OTP.",
            variant: "default",
         });
         router.push('/signin/otp-verification')
      } catch (error: any) {
         setError(error.data?.message || "An error occurred during sign-in.");
         toast({
            title: "Sign-In Failed",
            description: error.data?.message || "Please try again.",
            variant: "destructive",
         });
      }
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

            <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
         </form>
      </Form>
   );
};

export default LoginForm;
