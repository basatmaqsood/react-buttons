"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/pixelate-button.css"

interface PixelateButtonProps extends BaseButtonProps {
  pixelSize?: number
  pixelSpeed?: number
  onComplete?: () => void
  pixelColors?: string[]
}

interface Pixel {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
}

const PixelateButton: React.FC<PixelateButtonProps> = ({
  children,
  className = "",
  pixelSize = 8,
  pixelSpeed = 1,
  onComplete,
  pixelColors,
  backgroundColor = "#3b82f6",
  ...props
}) => {
  const [isPixelating, setIsPixelating] = useState(false)
  const [pixels, setPixels] = useState<Pixel[]>([])
  const [isReforming, setIsReforming] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isPixelating || isReforming) return

    props.onClick?.(e)

    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()

    // Calculate number of pixels based on button size and pixel size
    const cols = Math.ceil(rect.width / pixelSize)
    const rows = Math.ceil(rect.height / pixelSize)

    // Generate pixels
    const newPixels: Pixel[] = []
    const colors = pixelColors || [backgroundColor]

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const delay = (Math.random() * 0.5) / pixelSpeed

        newPixels.push({
          id: y * cols + x,
          x: x * pixelSize,
          y: y * pixelSize,
          size: pixelSize,
          color,
          delay,
        })
      }
    }

    setPixels(newPixels)
    setIsPixelating(true)

    // Start reforming after a delay
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsPixelating(false)
      setIsReforming(true)

      // Complete animation
      timeoutRef.current = setTimeout(() => {
        setIsReforming(false)
        setPixels([])
        onComplete?.()
      }, 500 / pixelSpeed)
    }, 1000 / pixelSpeed)
  }

  return (
    <div className="pixelate-button-container">
      <BaseButton
        ref={buttonRef}
        className={`pixelate-button ${className} ${isPixelating ? "is-pixelating" : ""} ${isReforming ? "is-reforming" : ""}`}
        onClick={handleClick}
        {...props}
      >
        <span className="pixelate-button__content" style={{ opacity: isPixelating ? 0 : 1 }}>
          {children}
        </span>
      </BaseButton>

      {(isPixelating || isReforming) && (
        <div className="pixelate-button__pixels-container">
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              className={`pixelate-button__pixel ${isReforming ? "is-reforming" : ""}`}
              style={{
                left: pixel.x,
                top: pixel.y,
                width: pixel.size,
                height: pixel.size,
                backgroundColor: pixel.color,
                animationDelay: `${pixel.delay}s`,
                animationDuration: `${0.5 / pixelSpeed}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PixelateButton

