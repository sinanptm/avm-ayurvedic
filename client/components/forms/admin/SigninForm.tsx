"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/common/SubmitButton";
import { signinFormValidation } from "@/components/forms/actions/adminValidation";
import { FormFieldType } from "@/types/fromTypes";
import { useSigninAdmin } from "@/lib/hooks/admin/useAdminAuth";
import { toast } from "@/components/ui/use-toast";
import {useRouter} from 'next/navigation'
import { useAuth } from "@/lib/hooks/useAuth";

const AdminSigninForm = () => {
   const form = useForm<z.infer<typeof signinFormValidation>>({
      resolver: zodResolver(signinFormValidation),
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const {mutate:signin,isPending}= useSigninAdmin();
   const router = useRouter();
   const {setCredentials} = useAuth()

   const onSubmit = async (values: z.infer<typeof signinFormValidation>) => {
      signin(values,{
         onSuccess:({message})=>{
            toast({
               title:"Signin Succuss! ✅",
               description:"Please Check Your Email for Further Instructions",
               variant:"success"
            });
            setCredentials('otpMailAdmin',values.email);
            router.push('/admin/otp-verification');
         },
         onError:(error)=>{
            toast({
               title:"Signin failed! ❌",
               description:error.response?.data.message||"Error Occurred Please try Again",
               variant:"destructive"
            })
         }
      });
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1"
         >
            <section className="mb-12 space-y-4">
               <h1 className="header">Admin Signin</h1>
               <p className="text-dark-700">Please signin to go to dashboard</p>
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

            <SubmitButton isLoading={isPending}>Sign In</SubmitButton>
         </form>
      </Form>
   );
};

export default AdminSigninForm;
