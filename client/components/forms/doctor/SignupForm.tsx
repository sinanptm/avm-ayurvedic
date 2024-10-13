"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/button/SubmitButton";
import { FormFieldType } from "@/types/enum";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSignUpDoctor, useUpdateProfileImageDoctor } from "@/lib/hooks/doctor/useDoctorAuth";
import useCrop from "@/lib/hooks/useCrop";
import CropImage from "@/components/common/CropImage";
import getCroppedImg from "@/lib/utils/cropImage";
import { Input } from "@/components/ui/input";
import { getPresignedUrlDoctor } from "@/lib/api/doctor/authenticationRoutes";
import axios from "axios";
import { DoctorDegrees } from "@/constants";
import { MultiSelect } from "@/components/ui/multi-select";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const doctorsignupFormSchema = z
   .object({
      name: z
         .string()
         .trim()
         .min(3, "Full Name must be at least 3 characters long")
         .max(50, "Name must be at most 50 characters."),
      email: z.string().trim().email("Invalid email address"),
      qualifications: z
         .array(z.string().min(1, "Qualification cannot be empty"))
         .min(1, "At least one qualification is required"),
      phone: z
         .string()
         .trim()
         .min(10, "Phone number must be at least 10 digits")
         .max(15, "Phone number must be at most 15 digits"),
      password: z
         .string()
         .trim()
         .min(6, "Password must be at least 6 characters long")
         .max(25, "Password must be at most 25 characters long")
         .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
         .regex(/[a-z]/, "Password must contain at least one lowercase letter")
         .regex(/[0-9]/, "Password must contain at least one number")
         .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
      confirmPassword: z.string().trim().min(6, "Password must be at least 6 characters long"),
      image: z
         .instanceof(globalThis.File)
         .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
            message: "Only JPEG and PNG files are allowed",
         })
         .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size should be less than 5MB",
         }),
   })
   .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
         ctx.addIssue({
            code: "custom",
            message: "The Password did not match",
            path: ["confirmPassword"],
         });
      }
   });

type FormValues = z.infer<typeof doctorsignupFormSchema>;

const SignUpForm = () => {
   const [error, setError] = useState<string>("");
   const [isLoading, setLoading] = useState(false);
   const [imageSrc, setImageSrc] = useState<string | null>(null);
   const [file, setFile] = useState<File | null>(null);
   const { mutate: updateProfile } = useUpdateProfileImageDoctor();
   const router = useRouter();
   const { toast } = useToast();
   const { mutate: signupDoctor } = useSignUpDoctor();
   const {
      crop,
      zoom,
      aspectRatio,
      rotation,
      croppedArea,
      setCrop,
      setZoom,
      setAspectRatio,
      setRotation,
      onCropComplete,
   } = useCrop();

   const form = useForm<FormValues>({
      resolver: zodResolver(doctorsignupFormSchema),
      defaultValues: {
         phone: "",
         password: "",
         name: "",
         email: "",
         confirmPassword: "",
         qualifications: [],
      },
   });

   const onSubmit = async (formData: FormValues) => {
      setError("");
      setLoading(true);

      if (!file) {
         toast({
            title: "No Image",
            description: "Please upload a profile image",
            variant: "destructive",
         });
         setLoading(false);
         return;
      }

      try {
         const croppedImage = await getCroppedImg(imageSrc as string, croppedArea);
         const croppedFile = new File([croppedImage], file.name, { type: file.type });

         signupDoctor(
            {
               doctor: {
                  email: formData.email,
                  password: formData.password,
                  phone: formData.phone,
                  name: formData.name,
                  qualifications: formData.qualifications,
               },
            },
            {
               onSuccess: async ({ id }) => {
                  try {
                     const { url, key } = await getPresignedUrlDoctor(id);
                     await axios.put(url, croppedFile, {
                        headers: {
                           "Content-Type": croppedFile.type,
                        },
                     });

                     updateProfile(
                        { key, id },
                        {
                           onSuccess: () => {
                              toast({
                                 title: "Registration Successful ✅",
                                 description:
                                    "You have successfully registered and your profile image has been uploaded.",
                                 variant: "success",
                              });
                              router.back();
                           },
                           onError: (uploadError) => {
                              setError(uploadError.message || "Failed to upload profile image");
                              toast({
                                 title: "Profile Image Upload Failed",
                                 description: uploadError.message || "Failed to upload profile image",
                                 variant: "destructive",
                              });
                              setLoading(false);
                           },
                        }
                     );
                  } catch (uploadError) {
                     setError("An error occurred while uploading the profile image.");
                     toast({
                        title: "Image Upload Error",
                        description: "An error occurred while uploading the profile image.",
                        variant: "destructive",
                     });
                     setLoading(false);
                  }
               },
               onError: (error) => {
                  setError(error.response?.data.message || "An error occurred during registration");
                  toast({
                     title: "Registration Failed ❌",
                     description: error.response?.data.message || "Please try again later.",
                     variant: "destructive",
                  });
                  setLoading(false);
               },
            }
         );
      } catch (error) {
         setError("An error occurred while cropping the image.");
         toast({
            title: "Profile Image Error",
            description: "An error occurred while cropping the image",
            variant: "destructive",
         });
         setLoading(false);
      }
   };

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            if (reader.result) {
               setImageSrc(reader.result as string);
               setFile(file);
               form.setValue("image", file);
            }
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <section className="mb-12 space-y-4">
               <h1 className="header">Hi There👋</h1>
               <p className="text-dark-700">
                  Already have an account?{" "}
                  <Link href="/doctor" className="text-blue-400">
                     Sign In
                  </Link>
               </p>
            </section>

            <CustomFormField
               fieldType={FormFieldType.INPUT}
               control={form.control}
               name="name"
               label="Full Name *"
               placeholder="John Doe"
               iconSrc="/assets/icons/user.svg"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
               <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email Address *"
                  placeholder="johndoe@gmail.com"
                  iconSrc="/assets/icons/email.svg"
               />

               <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  label="Phone Number *"
                  placeholder="(555) 123-4567"
               />
            </div>

            <div className="space-y-4">
               <div className="flex flex-col gap-2">
                  <FormLabel htmlFor="image">Profile Image *</FormLabel>
                  <Input
                     type="file"
                     id="image"
                     accept={ALLOWED_FILE_TYPES.join(", ")}
                     onChange={handleImageChange}
                     className="shad-input"
                  />
               </div>

               {imageSrc && (
                  <CropImage
                     imageSrc={imageSrc}
                     crop={crop}
                     zoom={zoom}
                     aspectRatio={aspectRatio!}
                     rotation={rotation}
                     setCrop={setCrop}
                     setZoom={setZoom}
                     setAspectRatio={setAspectRatio}
                     setRotation={setRotation}
                     onCropComplete={onCropComplete}
                  />
               )}
            </div>

            <FormField
               control={form.control}
               name="qualifications"
               render={({ field }) => (
                  <FormItem className="space-y-4">
                     <FormLabel>Qualifications *</FormLabel>
                     <MultiSelect
                        options={DoctorDegrees.map((degree) => ({ label: degree, value: degree }))}
                        placeholder="Select qualifications"
                        className="w-full"
                        {...field}
                        onValueChange={(value) => field.onChange(value)}
                     />
                     <FormMessage className="shad-error" />
                  </FormItem>
               )}
            />

            <CustomFormField
               control={form.control}
               fieldType={FormFieldType.PASSWORD}
               name="password"
               label="Password *"
               placeholder="Enter your password"
            />

            <CustomFormField
               fieldType={FormFieldType.PASSWORD}
               control={form.control}
               name="confirmPassword"
               label="Confirm Password *"
               placeholder="Re-enter your password"
            />
            {error && <p className="shad-error">{error}</p>}
            <FormMessage className="shad-error" />

            <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
         </form>
      </Form>
   );
};

export default SignUpForm;
