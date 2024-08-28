"use client";

import { useState } from "react";
import { FormFieldType } from "@/types/fromTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/common/SubmitButton";
import { registerFormValidation } from "@/lib/validators/userValidation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { BloodTypes, DiseaseOptions, GenderOptions } from "@/constants";
import { SelectItem } from "../../ui/select";

const RegistrationForm = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
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
         bloodType: "O+",
         disease: "none",
      },
   });

   const onSubmit = async (values: z.infer<typeof registerFormValidation>) => {
      setIsLoading(true);
      setTimeout(() => {
         console.log(values);
         setIsLoading(false);
      }, 2000);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <section className="mb-12 space-y-4">
               <h3 className="header">Personal information 🧑‍⚕️</h3>
            </section>

            {/* BirthDate & Gender */}
            <div className="flex flex-col gap-6 xl:flex-row">
               <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="birthDate"
                  label="Date of birth *"
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
            <div className="flex flex-col gap-6 xl:flex-row">
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

               <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="disease"
                  label="Primary Disease  *"
                  placeholder="Select a disease">
                  {DiseaseOptions.map((disease, i) => (
                     <SelectItem key={disease + i} value={disease}>
                        <div className="flex cursor-pointer items-center gap-2">
                           <p>{disease}</p>
                        </div>
                     </SelectItem>
                  ))}
               </CustomFormField>
            </div>
            {/* Address and occupation */}
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
            <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
         </form>
      </Form>
   );
};

export default RegistrationForm;
