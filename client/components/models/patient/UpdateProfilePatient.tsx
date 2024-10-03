"use client";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { updateProfileFormSchema } from "@/lib/form-schema/patientSchema";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Form, FormControl } from "../../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../button/SubmitButton";
import { IPatient } from "@/types/entities";
import CustomFormField from "../../common/CustomFormField";
import { FormFieldType } from "@/types/enum";
import { BloodGroups, GenderOptions } from "@/constants";
import { SelectItem } from "../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { useUpdatePatientProfile } from "@/lib/hooks/patient/usePatient";
import { toast } from "../../ui/use-toast";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Props = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   patientData: IPatient;
   refetch: any;
};

const UpdateProfilePatient = ({ open, setOpen, patientData, refetch }: Props) => {
   const form = useForm<z.infer<typeof updateProfileFormSchema>>({
      resolver: zodResolver(updateProfileFormSchema),
      defaultValues: {
         address: patientData.address,
         dob: patientData.dob,
         bloodGroup: patientData.bloodGroup,
         gender: patientData.gender,
         occupation: patientData.occupation,
         phone: patientData.phone,
         name: patientData.name,
      },
   });
   const { mutate: updateProfile, isPending } = useUpdatePatientProfile();
   const closeModal = () => {
      setOpen(!open);
   };

   const onSubmit = (data: z.infer<typeof updateProfileFormSchema>) => {
      updateProfile(data, {
         onSuccess: () => {
            closeModal();
            toast({
               title: "Profile Updated 🎉",
               description: "Personal Information has Updated",
               variant: "success",
            });
            refetch();
         },
         onError: (error) => {
            toast({
               title: "Profile Updating Failed ❌",
               description: error.response?.data.message || "Personal Information Failed",
               variant: "destructive",
            });
         },
      });
   };

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="max-w-3xl bg-dark-300 max-h-[90vh] flex flex-col">
            <AlertDialogHeader>
               <AlertDialogTitle className="flex items-start justify-between">
                  <p className="sub-header">Update Profile</p>
                  <Image
                     src={`/assets/icons/close.svg`}
                     width={20}
                     height={20}
                     alt="close-icon"
                     onClick={closeModal}
                     className="cursor-pointer"
                  />
               </AlertDialogTitle>
            </AlertDialogHeader>

            <ScrollArea className="flex-grow overflow-y-auto remove-scrollbar">
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                     <div className="flex flex-col gap-4">
                        <div className="w-full">
                           <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={form.control}
                              name="name"
                              label="Full Name *"
                              placeholder="John Doe"
                           />
                        </div>
                        <div className="w-full">
                           <CustomFormField
                              control={form.control}
                              fieldType={FormFieldType.PHONE_INPUT}
                              name="phone"
                              label="Phone Number *"
                              placeholder="+91 9080383948"
                           />
                        </div>
                        <div className="w-full">
                           <CustomFormField
                              fieldType={FormFieldType.DATE_PICKER}
                              control={form.control}
                              name="dob"
                              label="Date of birth *"
                              showDateText="Please Select A Date Before Today"
                           />
                        </div>
                        <div className="w-full">
                           <CustomFormField
                              fieldType={FormFieldType.SELECT}
                              control={form.control}
                              name="bloodGroup"
                              label="Your blood type  *"
                              placeholder="Select blood type"
                           >
                              {BloodGroups.map((blood, i) => (
                                 <SelectItem key={blood + i} value={blood}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                       <p>{blood}</p>
                                    </div>
                                 </SelectItem>
                              ))}
                           </CustomFormField>
                        </div>
                        <div className="w-full">
                           <CustomFormField
                              fieldType={FormFieldType.SKELETON}
                              control={form.control}
                              name="gender"
                              label="Gender  *"
                              renderSkeleton={(field) => (
                                 <FormControl>
                                    <RadioGroup
                                       className="flex h-11 gap-6 xl:justify-between"
                                       onValueChange={field.onChange}
                                       defaultValue={field.value}
                                    >
                                       {GenderOptions.map((option, i) => (
                                          <div key={option} className="radio-group">
                                             <RadioGroupItem value={option} id={option} />
                                             <Label htmlFor={option} className="cursor-pointer">
                                                {option}
                                             </Label>
                                          </div>
                                       ))}
                                    </RadioGroup>
                                 </FormControl>
                              )}
                           />
                        </div>
                        <div className="w-full">
                           <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={form.control}
                              name="occupation"
                              label="Occupation"
                              placeholder="Software Engineer"
                           />
                        </div>
                        <div className="w-full">
                           <CustomFormField
                              fieldType={FormFieldType.TEXTAREA}
                              control={form.control}
                              name="address"
                              label="Address *"
                              placeholder="123 Main St, City, Country"
                           />
                        </div>
                        <div className="w-full">
                           <SubmitButton isLoading={isPending}>Update</SubmitButton>
                        </div>
                     </div>
                  </form>
               </Form>
            </ScrollArea>
            <VisuallyHidden>
               <AlertDialogDescription />
            </VisuallyHidden>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default UpdateProfilePatient;
