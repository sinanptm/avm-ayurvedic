"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect, useState, useCallback, useMemo } from "react"
import Image from "next/image"

interface ImagesSliderProps {
  images: string[]
  children: React.ReactNode
  overlay?: boolean
  overlayClassName?: string
  className?: string
  autoplay?: boolean
  direction?: "up" | "down"
}

const ImagesSlider: React.FC<ImagesSliderProps> = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext()
      else if (event.key === "ArrowLeft") handlePrevious()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleNext, handlePrevious])

  useEffect(() => {
    if (!autoplay || !isInView) return

    const interval = setInterval(handleNext, 5000)
    return () => clearInterval(interval)
  }, [autoplay, isInView, handleNext])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    const sliderElement = document.getElementById("images-slider")
    if (sliderElement) observer.observe(sliderElement)

    return () => {
      if (sliderElement) observer.unobserve(sliderElement)
    }
  }, [])

  const slideVariants = useMemo(
    () => ({
      initial: { scale: 0, opacity: 0, rotateX: 45 },
      visible: {
        scale: 1,
        rotateX: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0] },
      },
      upExit: { opacity: 1, y: "-150%", transition: { duration: 0.8 } },
      downExit: { opacity: 1, y: "150%", transition: { duration: 0.8 } },
    }),
    []
  )

  return (
    <div
      id="images-slider"
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {children}
      {overlay && (
        <div
          className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)}
          aria-hidden="true"
        />
      )}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="visible"
          exit={direction === "up" ? "upExit" : "downExit"}
          variants={slideVariants}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slider image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default React.memo(ImagesSlider)