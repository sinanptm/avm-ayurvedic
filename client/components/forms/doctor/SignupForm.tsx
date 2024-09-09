"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/common/SubmitButton";
import { FormFieldType } from "@/types/fromTypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useSignUpPatient } from "@/lib/hooks/patient/usePatientAuth";

const RegistrationForm = () => {
   const [error, setError] = useState<string>("");
   const router = useRouter();
   const { toast } = useToast();
   const { mutate: signUpPatient, isPending, error: SignUpError } = useSignUpPatient();

   const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
   const MAX_FILE_SIZE = 5 * 1024 * 1024;
   const doctorSignupFormValidation = z
      .object({
         name: z
            .string()
            .trim()
            .min(3, "Full Name must be at least 3 characters long")
            .max(50, "Name must be at most 50 characters."),
         email: z.string().trim().email("Invalid email address"),
         phone: z
            .string()
            .trim()
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number must be at most 15 digits"),
         password: z
            .string()
            .trim()
            .min(6, "Password must be at least 6 characters long")
            .max(25, "Password must be at most 25 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
         confirmPassword: z.string().trim().min(6, "Password must be at least 6 characters long"),
         image: z
            .instanceof(globalThis.File)
            .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
               message: "Only JPEG and PNG files are allowed",
            })
            .refine((file) => file.size <= MAX_FILE_SIZE, {
               message: "File size should be less than 5MB",
            }),
      })
      .superRefine(({ confirmPassword, password }, ctx) => {
         if (confirmPassword !== password) {
            ctx.addIssue({
               code: "custom",
               message: "The Password did not match",
               path: ["confirmPassword"],
            });
         }
      });

   const form = useForm<z.infer<typeof doctorSignupFormValidation>>({
      resolver: zodResolver(doctorSignupFormValidation),
      defaultValues: {
         phone: "",
         password: "",
         name: "",
         email: "",
         confirmPassword: "",
      },
   });

   const onSubmit = (formData: z.infer<typeof doctorSignupFormValidation>) => {
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
                  <Link href="/doctor" className="text-blue-400">
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
