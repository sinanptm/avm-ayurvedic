"use client";

import { FormFieldType } from "@/types/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/button/SubmitButton";
import { registerFormValidation } from "@/components/forms/actions/userValidation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { BloodGroups, GenderOptions } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import { useGetPatientProfile, useUpdatePatientProfile } from "@/lib/hooks/patient/usePatient";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const RegistrationForm = ({ refetch }: { refetch: any }) => {
   const form = useForm<z.infer<typeof registerFormValidation>>({
      resolver: zodResolver(registerFormValidation),
      defaultValues: {
         birthDate: new Date(Date.now()),
         gender: "Male",
         address: "",
         occupation: "",
         concent: false,
         disclosureConsent: false,
         privacyConsent: false,
         bloodGroup: "O+",
         phone: "",
      },
   });
   const { data: patientData, isLoading } = useGetPatientProfile();
   const { mutate: registerInfo, isPending } = useUpdatePatientProfile();

   const router = useRouter();

   const onSubmit = (values: z.infer<typeof registerFormValidation>) => {
      registerInfo(
         {
            address: values.address,
            bloodGroup: values.bloodGroup,
            dob: values.birthDate,
            phone: values.phone.trim() !== "" ? values.phone : undefined,
            occupation: values.occupation,
            gender: values.gender,
         },
         {
            onSuccess: () => {
               toast({
                  title: "Successfully Registered ✅",
                  description: "Your details have been updated",
                  variant: "success",
               });
               refetch();
               router.push("/");
            },
            onError: (error) => {
               toast({
                  title: "Error in Submitting ❌",
                  description: error.response?.data.message,
                  variant: "destructive",
               });
               console.log(error);
            },
         }
      );
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <section className="mb-12 space-y-4">
               <h3 className="header">Personal information 🧑‍⚕️</h3>
            </section>

            <div className="flex flex-col gap-6 xl:flex-row">
               <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="birthDate"
                  label="Date of birth *"
                  dateFormat="dd/mm/yy"
                  showDateText="Please Select A Date Before Today"
               />

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
            <div className="flex flex-col gap-6 xl:flex-row">
               <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="bloodType"
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

            {!patientData?.phone && !isLoading && (
               <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.PHONE_INPUT}
                  name="phone"
                  label="Phone Number *"
                  placeholder="+91 9080383948"
               />
            )}

            <div className="flex flex-col gap-6 xl:flex-row">
               <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="address"
                  label="Address"
                  placeholder="14ᵗʰ  Street, New York"
               />
               <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.INPUT}
                  name="occupation"
                  label="Occupation"
                  placeholder="Software Engineer"
               />
            </div>
            <section className="mb-12 space-y-4">
               <div className="mb-9 space-y-1">
                  <h2 className="sub-header">Consent and Privacy</h2>
               </div>
            </section>

            <CustomFormField
               control={form.control}
               fieldType={FormFieldType.CHECKBOX}
               name="concent"
               label="I consent to receive treatment for my health condition."
            />
            <CustomFormField
               control={form.control}
               fieldType={FormFieldType.CHECKBOX}
               name="disclosureConsent"
               label="I consent to the use and disclosure of my health information for treatment purposes."
            />
            <CustomFormField
               control={form.control}
               fieldType={FormFieldType.CHECKBOX}
               name="privacyConsent"
               label="I acknowledge that I have reviewed and agree to the privacy policy."
            />
            <SubmitButton isLoading={isPending}>Sign In</SubmitButton>
         </form>
      </Form>
   );
};

export default RegistrationForm;
