"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useCallback, useMemo, memo } from "react";

const ImagesSlider = ({
   images,
   children,
   overlay = true,
   overlayClassName,
   className,
   autoplay = true,
   direction = "up",
}: {
   images: string[];
   children: React.ReactNode;
   overlay?: React.ReactNode;
   overlayClassName?: string;
   className?: string;
   autoplay?: boolean;
   direction?: "up" | "down";
}) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [loadedImages, setLoadedImages] = useState<string[]>([]);
   const [isInView, setIsInView] = useState(false);

   const handleNext = useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
   }, [images.length]);

   const handlePrevious = useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1));
   }, [images.length]);

   const loadImages = useCallback(async () => {
      const loadPromises = images.map((image) =>
         new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.src = image;
            img.onload = () => img.decode().then(() => resolve(image)).catch(reject);
            img.onerror = reject;
         })
      );

      try {
         const loaded = await Promise.all(loadPromises);
         setLoadedImages(loaded);
      } catch (error) {
         console.error("Failed to load images", error);
      }
   }, [images]);

   useEffect(() => {
      loadImages();
   }, [loadImages]);

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "ArrowRight") handleNext();
         else if (event.key === "ArrowLeft") handlePrevious();
      };

      window.addEventListener("keydown", handleKeyDown);

      let interval: number;
      if (autoplay && isInView) {
         interval = window.setInterval(handleNext, 5000);
      }

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
         clearInterval(interval);
      };
   }, [autoplay, handleNext, handlePrevious, isInView]);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsInView(entry.isIntersecting);
         },
         { threshold: 0.5 }
      );

      const sliderElement = document.getElementById("images-slider");
      if (sliderElement) observer.observe(sliderElement);

      return () => {
         if (sliderElement) observer.unobserve(sliderElement);
      };
   }, []);

   const slideVariants = useMemo(() => ({
      initial: {
         scale: 0,
         opacity: 0,
         rotateX: 45,
      },
      visible: {
         scale: 1,
         rotateX: 0,
         opacity: 1,
         transition: {
            duration: 0.5,
            ease: [0.645, 0.045, 0.355, 1.0],
         },
      },
      upExit: {
         opacity: 1,
         y: "-150%",
         transition: {
            duration: 0.8,
         },
      },
      downExit: {
         opacity: 1,
         y: "150%",
         transition: {
            duration: 0.8,
         },
      },
   }), []);

   const areImagesLoaded = loadedImages.length > 0;

   return (
      <div
         id="images-slider"
         className={cn("overflow-hidden h-full w-full relative flex items-center justify-center", className)}
         style={{ perspective: "1000px" }}
      >
         {areImagesLoaded && children}
         {areImagesLoaded && overlay && (
            <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />
         )}
         {areImagesLoaded && (
            <AnimatePresence>
               <motion.img
                  key={currentIndex}
                  src={loadedImages[currentIndex]}
                  initial="initial"
                  animate="visible"
                  alt="Banner"
                  exit={direction === "up" ? "upExit" : "downExit"}
                  variants={slideVariants}
                  className="image h-full w-full absolute inset-0 object-cover object-center"
               />
            </AnimatePresence>
         )}
      </div>
   );
};


export default memo(ImagesSlider);