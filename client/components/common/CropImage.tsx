"use client";

import { Dispatch, memo, SetStateAction } from "react";
import Cropper from "react-easy-crop";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type CropImageProps = {
   imageSrc: string;
   crop: { x: number; y: number };
   zoom: number;
   aspectRatio: number;
   rotation: number;
   setCrop: Dispatch<SetStateAction<{ x: number; y: number }>>;
   setZoom: Dispatch<SetStateAction<number>>;
   setAspectRatio: Dispatch<SetStateAction<number | undefined>>;
   setRotation: Dispatch<SetStateAction<number>>;
   onCropComplete: (croppedAreaPercentage: any, croppedAreaPixels: any) => void;
};

const CropImage = ({
   imageSrc,
   crop,
   zoom,
   aspectRatio,
   rotation,
   setCrop,
   setZoom,
   setAspectRatio,
   setRotation,
   onCropComplete,
}: CropImageProps) => {
   return (
      <div>
         <div className="relative w-full h-64 overflow-hidden">
            <Cropper
               image={imageSrc}
               crop={crop}
               zoom={zoom}
               aspect={aspectRatio}
               rotation={rotation}
               onCropChange={setCrop}
               onZoomChange={setZoom}
               onCropComplete={onCropComplete}
               style={{
                  containerStyle: { position: "relative", width: "100%", height: "100%" },
                  mediaStyle: { objectFit: "contain" },
               }}
            />
         </div>
         {imageSrc && (
            <div className="flex flex-col gap-4 mt-4 text-neutral-800 dark:text-neutral-200">
               <div className="flex flex-col gap-2">
                  <label className="font-semibold">Aspect Ratio</label>
                  <Select value={aspectRatio.toString()} onValueChange={(value) => setAspectRatio(Number(value))}>
                     <SelectTrigger className="bg-neutral-200 dark:bg-neutral-700">
                        <SelectValue placeholder="Select Aspect Ratio" />
                     </SelectTrigger>
                     <SelectContent className="bg-neutral-100 dark:bg-neutral-800">
                        <SelectItem value="1">1:1 (Square)</SelectItem>
                        <SelectItem value={(4 / 3).toString()}>4:3 (Portrait)</SelectItem>
                        <SelectItem value={(16 / 9).toString()}>16:9 (Landscape)</SelectItem>
                        <SelectItem value={(3 / 2).toString()}>3:2 (Standard)</SelectItem>
                        <SelectItem value={(2 / 1).toString()}>2:1 (Panorama)</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="flex flex-col gap-2">
                  <label className="font-semibold">Zoom</label>
                  <Slider
                     min={1}
                     max={3}
                     step={0.1}
                     value={[zoom]}
                     onValueChange={(value) => setZoom(value[0])}
                     className="w-full"
                     variant="green"
                  />
               </div>

               <div className="flex flex-col gap-2">
                  <label className="font-semibold">Rotation</label>
                  <Input
                     type="number"
                     min="0"
                     max="360"
                     step="1"
                     value={rotation}
                     onChange={(e) => setRotation(Number(e.target.value))}
                     className="bg-neutral-200 dark:bg-neutral-700 border dark:border-neutral-600"
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default memo(CropImage);
