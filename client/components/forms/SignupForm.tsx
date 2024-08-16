"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { signupFormValidation } from "@/lib/userValidation";
// import { useLoginMutation } from "@/lib/features/api/authApi";
import { FormFieldType } from "@/types/fromTypes";
import Link from "next/link";

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [login] = useLoginMutation();
  const form = useForm<z.infer<typeof signupFormValidation>>({
    resolver: zodResolver(signupFormValidation),
    defaultValues: {
      phone:"",
      password: "",
      name: "",
      email:"",
      confirmPassword:""
    },
  });

  const onSubmit = async (values: z.infer<typeof signupFormValidation>) => {
    setIsLoading(true);
    setTimeout(() => {
      console.log("done");
    }, 2000);
    // try {
    //   const user = await login({
    //     phone: values.phone,
    //     password: values.password,
    //   }).unwrap();

    //   console.log("Login successful:", user);
    // } catch (error) {
    //   console.error("Failed to log in:", error);
    // } finally {
    setIsLoading(false);
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There👋</h1>
          <p className="text-dark-700">
            Already have an account{" "}
            <Link href={"/patient/signin"} className="text-blue-400">
              Sign In
            </Link>
          </p>
        </section>
        <section className="mb-12 space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal information </h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name *"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* EMAIL & PHONE */}
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email address  *"
            placeholder="johndoe@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number  *"
            placeholder="(555) 123-4567"
          />
        </div>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
          name="password"
          label="Password  *"
          placeholder="Enter your password"
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
        />
        <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
      </form>
    </Form>
  );
};

export default RegistrationForm;
