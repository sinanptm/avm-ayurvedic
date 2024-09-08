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
import SubmitButton from "../../common/SubmitButton";
import CustomFormField from "../../common/CustomFormField";
import { FormFieldType } from "@/types/fromTypes";
import { toast } from "../../ui/use-toast";
import { useAddDoctorAdmin } from "@/lib/hooks/admin/useAdminDoctor";

type Props = {
   isOpen: boolean;
   setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const formSchema = z.object({
   email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordModal = ({ isOpen, setIsOpen }: Props) => {
   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
      },
   });
   const {
      control,
      handleSubmit,
   } = form;
   const {mutate:addDoctor,isPending} = useAddDoctorAdmin()
   const onSubmit = async (data: FormValues) => {
      addDoctor(
         { email: data.email },
         {
            onSuccess: () => {
               toast({
                  title: "New Doctor Added",
                  description: "New Doctor Email has been added",
                  variant: "success",
               });
               setIsOpen(false)
               form.reset();
            },
            onError:(error)=>{
                toast({
                  title:"Adding Doctor Failed",
                  description:error.response?.data.message||"An Error Occurred",
                  variant:"destructive"
                });
            }
         }
      );
   };

   return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Add Doctor</AlertDialogTitle>
               <AlertDialogDescription>
                  Enter your email address of the doctor that you are gonna add.
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
                        <SubmitButton isLoading={isPending} variant="outline" className="bg-slate-500 bg-opacity-40 cursor-pointer">
                           Add Doctor
                        </SubmitButton>
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </form>
            </Form>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default ForgotPasswordModal;
