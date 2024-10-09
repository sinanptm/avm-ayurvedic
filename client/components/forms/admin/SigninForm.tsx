"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/button/SubmitButton";
import { signinFormSchema } from "@/lib/form-schema/adminSchema";
import { FormFieldType } from "@/types/enum";
import { useSigninAdmin } from "@/lib/hooks/admin/useAdminAuth";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { ButtonV2 } from "@/components/button/ButtonV2";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

const AdminSigninForm = () => {
   const form = useForm<z.infer<typeof signinFormSchema>>({
      resolver: zodResolver(signinFormSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const { mutate: signin, isPending } = useSigninAdmin();
   const router = useRouter();
   const { setCredentials } = useAuth();
   const dummyEmail = "admin@gmail.com";
   const dummyPassword = "asdf";

   const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
      signin(values, {
         onSuccess: () => {
            toast({
               title: "Signin Success! ✅",
               description: "Otp have sended. Please Check Your Email for Further Instructions",
               variant: "success",
            });
            setCredentials("otpMailAdmin", values.email);
            router.push("/admin/otp-verification");
         },
         onError: (error) => {
            toast({
               title: "Signin failed! ❌",
               description: error.response?.data.message || "Error Occurred Please try Again",
               variant: "destructive",
            });
         },
      });
   };

   const fillDummyCredentials = () => {
      form.setValue("email", dummyEmail);
      form.setValue("password", dummyPassword);
   };

   return (
      <Form { ...form }>
         <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
               <h1 className="header">Admin Signin</h1>
               <p className="text-dark-700">Please signin to go to dashboard</p>
            </section>

            <CustomFormField
               fieldType={ FormFieldType.INPUT }
               control={ form.control }
               name="email"
               label="Email address  *"
               placeholder="johndoe@gmail.com"
               iconSrc={ "/assets/icons/email.svg" }
            />

            <CustomFormField
               control={ form.control }
               fieldType={ FormFieldType.PASSWORD }
               name="password"
               label="Password *"
               placeholder="Enter your password"
            />

            <div className="flex justify-between items-center space-x-1">
               <SubmitButton isLoading={ isPending }>Sign In</SubmitButton>
               <Popover>
                  <PopoverTrigger asChild>
                     <ButtonV2 type="button" variant="shine" size="icon">
                        <Image
                           src={ '/assets/icons/guarantees/confidential.svg' }
                           width={ 10 }
                           height={ 10 }
                           alt="Dummy user"
                        />
                     </ButtonV2>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-black">
                     <div className="space-y-2">
                        <h3 className="font-semibold">Tester Credentials:</h3>
                        <p className="text-sm">Email: { dummyEmail }</p>
                        <p className="text-sm">Password: { dummyPassword }</p>
                        <ButtonV2 type="button" variant="secondary" size="sm" onClick={ fillDummyCredentials }>
                           Fill Credentials
                        </ButtonV2>
                     </div>
                  </PopoverContent>
               </Popover>
            </div>
         </form>
      </Form>
   );
};

export default AdminSigninForm;