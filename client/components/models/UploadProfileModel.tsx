"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Form } from "../ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../common/SubmitButton";
import { IPatient } from "@/types";
import { Input } from "../ui/input";
import { useUpdatePatientProfileImage } from "@/lib/hooks/patient/usePatient";
import { toast } from "../ui/use-toast";
import getCroppedImg from "@/lib/utils/cropImage";
import CropImage from "@/components/common/CropImage";
import useCrop from "@/lib/hooks/useCrop";

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

  const { crop, zoom, aspectRatio, rotation, croppedArea, setCrop, setZoom, setAspectRatio, setRotation, onCropComplete } = useCrop();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { mutate: updateProfile, isPending } = useUpdatePatientProfileImage();

  const closeModal = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!file) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc as string, croppedArea);
      const croppedFile = new File([croppedImage], file.name, { type: file.type });

      updateProfile(
        { image: croppedFile },
        {
          onSuccess() {
            refetch();
            toast({
              title: "Profile Update",
              variant: "success",
            });
            closeModal();
          },
          onError: (error) => {
            toast({
              title: "Profile Update",
              variant: "destructive",
              description: error.response?.data.message || "An error occurred",
            });
          },
        }
      );
    } catch (error) {
      toast({
        title: "Profile Update",
        variant: "destructive",
        description: "An error occurred while cropping the image",
      });
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
    return <div>loading.....</div>;
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
              <SubmitButton isLoading={isPending}>Update</SubmitButton>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UploadProfileModel;
