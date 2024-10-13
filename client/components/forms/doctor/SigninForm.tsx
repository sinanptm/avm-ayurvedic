"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormMessage } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/button/SubmitButton";
import { signinFormSchema } from "@/lib/form-schema/adminSchema";
import { FormFieldType } from "@/types/enum";
import Link from "next/link";
import { useSignInDoctor } from "@/lib/hooks/doctor/useDoctorAuth";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ForgotPasswordModalDoctor from "./ForgetPasswordForm";
import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover";
import { ButtonV2 } from "@/components/button/ButtonV2";
import Image from "next/image";

const AdminSigninForm = () => {
   const form = useForm<z.infer<typeof signinFormSchema>>({
      resolver: zodResolver(signinFormSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const { mutate: signin, isPending } = useSignInDoctor();
   const { setCredentials } = useAuth();
   const router = useRouter();
   const [isForgetPasswordModelOpen, setForgetPasswordModelOpen] = useState(false);
   const dummyEmail = "demodoctor@gmail.com";
   const dummyPassword = "Mw@276si";

   const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
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
   const setDummyData = () => {
      form.setValue("email", dummyEmail);
      form.setValue("password", dummyPassword);
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

               <div className="flex justify-between items-center space-x-1">
                  <SubmitButton isLoading={isPending}>Sign In</SubmitButton>
                  <Popover>
                     <PopoverTrigger asChild>
                        <ButtonV2 type="button" variant="shine" size="icon">
                           <Image
                              src={"/assets/icons/guarantees/confidential.svg"}
                              width={10}
                              height={10}
                              alt="Dummy user"
                           />
                        </ButtonV2>
                     </PopoverTrigger>
                     <PopoverContent className="w-80 bg-black">
                        <div className="space-y-2">
                           <h3 className="font-semibold">Tester Credentials:</h3>
                           <p className="text-sm">Email: {dummyEmail}</p>
                           <p className="text-sm">Password: {dummyPassword}</p>
                           <ButtonV2 type="button" variant="secondary" size="sm" onClick={setDummyData}>
                              Fill Credentials
                           </ButtonV2>
                        </div>
                     </PopoverContent>
                  </Popover>
               </div>
            </form>
         </Form>
         <ForgotPasswordModalDoctor isOpen={isForgetPasswordModelOpen} setIsOpen={setForgetPasswordModelOpen} />
      </>
   );
};

export default AdminSigninForm;
