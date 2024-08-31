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
import SubmitButton from "../common/SubmitButton";
import CustomFormField from "../common/CustomFormField";
import { FormFieldType } from "@/types/fromTypes";

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

  const { control, handleSubmit, formState: { isSubmitting } } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Password reset email sent to:", data.email);
      setIsOpen(false);
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Forgot Password</AlertDialogTitle>
          <AlertDialogDescription>
            Enter your email address and we'll send you instructions to reset your password.
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
                <SubmitButton isLoading={isSubmitting} variant="outline" className="bg-slate-500 bg-opacity-40"  >
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

export default ForgotPasswordModal;