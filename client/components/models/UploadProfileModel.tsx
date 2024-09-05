"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form } from "../ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../common/SubmitButton";
import { IPatient } from "@/types";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";
import getCroppedImg from "@/lib/utils/cropImage";
import CropImage from "@/components/common/CropImage";
import useCrop from "@/lib/hooks/useCrop";
import axios from "axios";
import { getUpdateProfileUrl, updateProfileImage } from "@/lib/api/patient/authorizedRoutes";

type Props = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   patientData: IPatient;
   refetch: () => void;
};

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UploadProfileModel = ({ open, setOpen, refetch }: Props) => {
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

   type FormData = z.infer<typeof uploadProfileImageSchema>;
   const form = useForm<FormData>({
      resolver: zodResolver(uploadProfileImageSchema),
   });

   const [isLoading, setIsLoading] = useState(false);
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
   const [imageSrc, setImageSrc] = useState<string | null>(null);
   const [file, setFile] = useState<File | null>(null);

   const closeModal = () => {
      setOpen(false);
   };

   const onSubmit: SubmitHandler<FormData> = async (data) => {
      if (!file) return;

      try {
         setIsLoading(true);
         const croppedImage = await getCroppedImg(imageSrc as string, croppedArea);
         const croppedFile = new File([croppedImage], file.name, { type: file.type });
         const { url, key } = await getUpdateProfileUrl();

         await axios.put(url, croppedFile, {
            headers: {
               "Content-Type": croppedFile.type,
            },
         });

         await updateProfileImage(key);

         toast({
            title: "Profile Update",
            variant: "success",
         });
         
         setIsLoading(false);
         refetch();
         closeModal();
      } catch (error) {
         toast({
            title: "Profile Update",
            variant: "destructive",
            description: "An error occurred while Image Saving",
         });
         console.log(error);

         setIsLoading(false);
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

   if (typeof window === "undefined") {
      return <div>Loading.....</div>;
   }

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
                     <SubmitButton isLoading={isLoading}>Update</SubmitButton>
                  </div>
               </form>
            </Form>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default UploadProfileModel;
