import { useState } from "react";

const useCrop = () => {
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [aspectRatio, setAspectRatio] = useState<number | undefined>(1);
   const [rotation, setRotation] = useState(0);
   const [croppedArea, setCroppedArea] = useState<any>(null);

   const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
      setCroppedArea(croppedAreaPixels);
   };

   return {
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
   };
};

export default useCrop;
