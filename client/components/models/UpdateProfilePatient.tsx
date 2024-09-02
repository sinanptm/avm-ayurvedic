"use client";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form, FormControl } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProfileFormValidation } from "@/components/forms/actions/userValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../common/SubmitButton";
import { IPatient } from "@/types";
import CustomFormField from "../common/CustomFormField";
import { FormFieldType } from "@/types/fromTypes";
import { BloodTypes, GenderOptions } from "@/constants";
import { SelectItem } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

type Props = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   patientData: IPatient;
   isFetching: boolean;
};

const UpdateProfilePatient = ({ open, setOpen, isFetching, patientData }: Props) => {
   const closeModal = () => {
      setOpen(!open);
   };

   if (isFetching) {
      return <p>Loading...</p>;
   }

   const form = useForm<z.infer<typeof updateProfileFormValidation>>({
      resolver: zodResolver(updateProfileFormValidation),
      defaultValues: {
         address: patientData.address,
         birthDate: patientData.dob,
         bloodType: patientData.bloodGroup,
         gender: patientData.gender,
         occupation: patientData.occupation,
         phone: patientData.phone,
         name: patientData.name,
      },
   });

   const onSubmit = (data: z.infer<typeof updateProfileFormValidation>) => {
      console.log(data);
      closeModal();
   };

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent>
            <AlertDialogContent className="shad-alert-dialog">
               <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-start justify-between">
                     <p className="sub-header">Update Profile</p>
                     <Image
                        src={`/assets/icons/close.svg`}
                        width={20}
                        height={20}
                        alt="close-icon"
                        onClick={() => closeModal()}
                        className="cursor-pointer"
                     />
                  </AlertDialogTitle>
               </AlertDialogHeader>
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
                              name="birthDate"
                              label="Date of birth *"
                              showDateText="Please Select A Date Before Today"
                           />
                        </div>
                        <div className="w-full">
                           <CustomFormField
                              fieldType={FormFieldType.SELECT}
                              control={form.control}
                              name="bloodType"
                              label="Your blood type  *"
                              placeholder="Select blood type">
                              {BloodTypes.map((blood, i) => (
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
                                       defaultValue={field.value}>
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
                           <SubmitButton isLoading={false}>Update</SubmitButton>
                        </div>
                     </div>
                  </form>
               </Form>
            </AlertDialogContent>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default UpdateProfilePatient;
