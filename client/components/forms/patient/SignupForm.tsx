"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/button/SubmitButton";
import { signupFormSchema } from "@/components/forms/schema/patientSchema";
import { FormFieldType } from "@/types/enum";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSignUpPatient } from "@/lib/hooks/patient/usePatientAuth";

const RegistrationForm = () => {
   const [error, setError] = useState<string>("");
   const router = useRouter();
   const { toast } = useToast();
   const { mutate: signUpPatient, isPending } = useSignUpPatient();

   const form = useForm<z.infer<typeof signupFormSchema>>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: {
         phone: "",
         password: "",
         name: "",
         email: "",
         confirmPassword: "",
      },
   });

   const onSubmit = (formData: z.infer<typeof signupFormSchema>) => {
      signUpPatient(formData, {
         onSuccess: () => {
            toast({
               title: "Registration Successful ✅",
               description: "You have successfully registered. Please sign in.",
               variant: "default",
            });
            router.push("/signin");
         },
         onError: (error) => {
            setError(error.response?.data.message || "An error occurred during registration");
            toast({
               title: "Registration Failed ❌",
               description: error.response?.data.message || "Please try again later.",
               variant: "destructive",
               action: (
                  <Button variant={"link"}>
                     <Link href="/signin">Sign In</Link>
                  </Button>
               ),
            });
         },
      });
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <section className="mb-12 space-y-4">
               <h1 className="header">Hi There👋</h1>
               <p className="text-dark-700">
                  Already have an account?{" "}
                  <Link href="/signin" className="text-blue-400">
                     Sign In
                  </Link>
               </p>
            </section>
            <section className="mb-12 space-y-4">
               <div className="mb-9 space-y-1">
                  <h2 className="sub-header">Personal Information</h2>
               </div>
            </section>

            <CustomFormField
               fieldType={FormFieldType.INPUT}
               control={form.control}
               name="name"
               label="Full Name *"
               placeholder="John Doe"
               iconSrc="/assets/icons/user.svg"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
               <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email Address *"
                  placeholder="johndoe@gmail.com"
                  iconSrc="/assets/icons/email.svg"
               />

               <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  label="Phone Number *"
                  placeholder="(555) 123-4567"
               />
            </div>

            <CustomFormField
               control={form.control}
               fieldType={FormFieldType.PASSWORD}
               name="password"
               label="Password *"
               placeholder="Enter your password"
            />
            <CustomFormField
               fieldType={FormFieldType.PASSWORD}
               control={form.control}
               name="confirmPassword"
               label="Confirm Password"
               placeholder="Re-enter your password"
            />

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <SubmitButton isLoading={isPending}>Sign Up</SubmitButton>
         </form>
      </Form>
   );
};

export default RegistrationForm;
