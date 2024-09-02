"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../common/SubmitButton";
import { IPatient } from "@/types";
import { Input } from "../ui/input";

type Props = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   patientData: IPatient;
};


const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const uploadProfileImageSchema = z.object({
   image: z
      .instanceof(File)
      .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
         message: "Only JPEG and PNG files are allowed",
      })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
         message: "File size should be less than 5MB",
      }),
});

const UploadProfileModel = ({ open, setOpen, patientData }: Props) => {
   const [imagePreview, setImagePreview] = useState<string>(patientData.profile || "/assets/icons/close.svg");

   const form = useForm<z.infer<typeof uploadProfileImageSchema>>({
      resolver: zodResolver(uploadProfileImageSchema),
   });
   const closeModal = () => {
      setOpen(false);
   };

   const onSubmit = (data: z.infer<typeof uploadProfileImageSchema>) => {
      console.log(data);
      
   };

   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         setImagePreview(URL.createObjectURL(file));
         form.setValue("image", file);
      }
   };

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="shadow-lg rounded-md p-6">
            <AlertDialogHeader>
               <AlertDialogTitle className="flex items-center justify-between">
                  <p className="text-lg font-semibold">Update Profile</p>
                  <Image
                     src="/assets/icons/close.svg"
                     width={20}
                     height={20}
                     alt="Close icon"
                     onClick={closeModal}
                     className="cursor-pointer"
                  />
               </AlertDialogTitle>
            </AlertDialogHeader>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex flex-col gap-4">
                     <div className="flex flex-col gap-2">
                        <label htmlFor="image" className="font-semibold">
                           Profile Image *
                        </label>
                        <Input
                           type="file"
                           id="image"
                           accept={ALLOWED_FILE_TYPES.join(", ")}
                           onChange={handleImageChange}
                           className="shad-input"
                        />
                     </div>
                     <div className="relative h-40 w-40">
                        <Image
                           src={imagePreview}
                           alt="Selected Image Preview"
                           layout="fill"
                           objectFit="cover"
                           className="rounded-full border-4 border-white"
                        />
                     </div>
                     <SubmitButton isLoading={false}>Update</SubmitButton>
                  </div>
               </form>
            </Form>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default UploadProfileModel;
