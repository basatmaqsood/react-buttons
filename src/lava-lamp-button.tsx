"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/lava-lamp-button.css"

interface LavaLampButtonProps extends BaseButtonProps {
  waveSpeed?: number
  blobSize?: number
  colorTransition?: boolean
  blobCount?: number
  primaryColor?: string
  secondaryColor?: string
}

const LavaLampButton: React.FC<LavaLampButtonProps> = ({
  children,
  className = "",
  waveSpeed = 1,
  blobSize = 0.5,
  colorTransition = true,
  blobCount = 5,
  primaryColor = "#ff6b6b",
  secondaryColor = "#4ecdc4",
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create blobs
    const blobs = Array.from({ length: blobCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: (20 + Math.random() * 30) * blobSize,
      speedX: (Math.random() - 0.5) * waveSpeed,
      speedY: (Math.random() - 0.5) * waveSpeed,
      hue: Math.random() * 360,
    }))

    // Animation loop
    const animate = (time: number) => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw blobs
      for (const blob of blobs) {
        // Update position
        blob.x += blob.speedX
        blob.y += blob.speedY

        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.speedX *= -1
        if (blob.y < 0 || blob.y > canvas.height) blob.speedY *= -1

        // Update hue if color transition is enabled
        if (colorTransition) {
          blob.hue = (blob.hue + 0.1 * waveSpeed) % 360
        }

        // Draw blob
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)

        if (colorTransition) {
          gradient.addColorStop(0, `hsla(${blob.hue}, 100%, 70%, 0.8)`)
          gradient.addColorStop(1, `hsla(${blob.hue}, 100%, 50%, 0)`)
        } else {
          const color1 = primaryColor
          const color2 = secondaryColor
          gradient.addColorStop(0, color1 + "cc") // Add alpha
          gradient.addColorStop(1, color2 + "00") // Transparent
        }

        ctx.fillStyle = gradient
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [waveSpeed, blobSize, colorTransition, blobCount, primaryColor, secondaryColor])

  return (
    <div className="lava-lamp-button-container">
      <canvas ref={canvasRef} className="lava-lamp-button__canvas" />
      <BaseButton className={`lava-lamp-button ${className}`} {...props}>
        <span className="lava-lamp-button__content">{children}</span>
      </BaseButton>
    </div>
  )
}

export default LavaLampButton

