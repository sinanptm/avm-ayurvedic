"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/utils/CustomFormField";
import SubmitButton from "@/components/utils/SubmitButton";
import { signinFormValidation } from "@/lib/userValidation";
import Link from "next/link";
import { FormFieldType } from "@/types/fromTypes";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signinFormValidation>>({
    resolver: zodResolver(signinFormValidation),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinFormValidation>) => {
    setIsLoading(true);
    console.log("clicked");
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome Back 👋</h1>
          <p className="text-dark-700">
            Schedule your first appointment{" "}
            <Link href={"/patient/signup"} className="text-blue-400">
              Sign Up
            </Link>
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
          name="password"
          label="Password"
          placeholder="Enter your password"
        />

        <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
