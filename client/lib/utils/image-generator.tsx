
'use client'
import React, { useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OgImage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to 1200x630 (standard og-image size)
    canvas.width = 1200
    canvas.height = 630

    // Load and draw the background image
    const img = new Image()
    img.onload = () => {
      // Draw the image covering the entire canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Add a semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add title
      ctx.font = 'bold 64px Arial'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.fillText('AVM Ayurvedic', canvas.width / 2, 200)

      // Add subtitle
      ctx.font = '32px Arial'
      ctx.fillStyle = '#f0f0f0'
      ctx.fillText('Holistic Ayurveda Health Care & Wellness', canvas.width / 2, 260)

      // Add call-to-action
      ctx.font = 'bold 36px Arial'
      ctx.fillStyle = '#4CAF50'
      ctx.fillText('Book Your Consultation Today', canvas.width / 2, 540)
    }
    img.src = '/assets/images/onboarding-img.png'
  }, [])

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'og-image.webp'
    link.href = canvas.toDataURL('image/webp')
    link.click()
  }

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AVM Ayurvedic OG Image Preview</h2>
      <div className="mb-4">
        <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', maxWidth: '600px' }} />
      </div>
      <Button onClick={downloadImage}>Download OG Image</Button>
      <p className="mt-4 text-sm text-gray-600">
        This image will be used as the og:image for your website. It will appear when your site is shared on social media platforms.
      </p>
    </Card>
  )
}