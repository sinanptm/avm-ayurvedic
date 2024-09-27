import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
   AlertDialog,
   AlertDialogTitle,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogCancel,
   AlertDialogAction,
   AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import SubmitButton from "../../button/SubmitButton";
import CustomFormField from "../../common/CustomFormField";
import { FormFieldType } from "@/types/enum";
import { toast } from "../../ui/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";
import { useForgotPasswordDoctor } from "@/lib/hooks/doctor/useDoctorAuth";

type Props = {
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const formSchema = z.object({
   email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordModalDoctor = ({ isOpen, setIsOpen }: Props) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
      },
   });
   const { control, handleSubmit } = form;
   const { mutate: forgetPassword, isPending } = useForgotPasswordDoctor();
   const { setCredentials } = useAuth();
   const onSubmit = async (data: FormValues) => {
      if (isOpen) {
         forgetPassword(
            { email: data.email },
            {
               onSuccess: () => {
                  toast({
                     title: "Email Sended 📩",
                     description: "Please Check Your Email for further instructions",
                     variant: "success",
                  });
                  setIsOpen(false);
                  setCredentials("resetMailDoctor", data.email);
                  form.reset();
               },
               onError: (error) => {
                  if (error.status === 404) {
                     toast({
                        title: "Invalid Email Address",
                        description: "Please Verify Your Email Address",
                        variant: "destructive",
                     });
                  } else {
                     toast({
                        title: "Action Failed",
                        description: error.response?.data.message || "Unknown Error Occurred",
                        variant: "destructive",
                     });
                  }
               },
            }
         );
      }
   };

   return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Forgot Password</AlertDialogTitle>
               <AlertDialogDescription>
                  Enter your email address and we&apos;ll send you instructions to reset your password.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <Form {...form}>
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <CustomFormField
                     fieldType={FormFieldType.INPUT}
                     control={control}
                     name="email"
                     label="Email Address *"
                     placeholder="johndoe@gmail.com"
                     iconSrc="/assets/icons/email.svg"
                  />
                  <AlertDialogFooter className="mt-6">
                     <AlertDialogCancel asChild>
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>
                           Cancel
                        </Button>
                     </AlertDialogCancel>
                     <AlertDialogAction asChild>
                        <SubmitButton
                           isLoading={isPending}
                           variant="outline"
                           className="bg-slate-500 bg-opacity-40 cursor-pointer"
                        >
                           Send Reset Instructions
                        </SubmitButton>
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </form>
            </Form>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default ForgotPasswordModalDoctor;
