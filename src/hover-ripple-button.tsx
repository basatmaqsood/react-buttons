"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/hover-ripple-button.css"

interface HoverRippleButtonProps extends BaseButtonProps {
  rippleColor?: string
  rippleSize?: number
  rippleSpeed?: number
  rippleOpacity?: number
  rippleCount?: number
}

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

const HoverRippleButton: React.FC<HoverRippleButtonProps> = ({
  children,
  className = "",
  rippleColor = "rgba(255, 255, 255, 0.7)",
  rippleSize = 100,
  rippleSpeed = 1,
  rippleOpacity = 0.7,
  rippleCount = 3,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const nextId = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isCreatingRipple = useRef(false)

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || isCreatingRipple.current) return

    isCreatingRipple.current = true

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: nextId.current++,
      x,
      y,
      size: 0,
    }

    setRipples((prev) => [...prev, newRipple])

    // Animate ripple growth
    let size = 0
    const maxSize = rippleSize * 2
    const increment = maxSize / (rippleSpeed * 60) // 60fps target

    const growRipple = () => {
      size += increment

      if (size < maxSize) {
        setRipples((prev) => prev.map((r) => (r.id === newRipple.id ? { ...r, size } : r)))

        timeoutRef.current = setTimeout(growRipple, 1000 / 60)
      } else {
        // Remove ripple after it reaches max size
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
        isCreatingRipple.current = false
      }
    }

    timeoutRef.current = setTimeout(growRipple, 1000 / 60)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Only create a new ripple if we're not already creating one
    // or if we have fewer than rippleCount ripples
    if (!isCreatingRipple.current && ripples.length < rippleCount) {
      createRipple(e)
    }
  }

  const handleMouseLeave = () => {
    // Clear any ongoing animations
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Remove all ripples
    setRipples([])
    isCreatingRipple.current = false
  }

  return (
    <BaseButton
      ref={buttonRef}
      className={`hover-ripple-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="hover-ripple-button__content">{children}</span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="hover-ripple-button__ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
            opacity: rippleOpacity * (1 - ripple.size / (rippleSize * 2)),
          }}
        />
      ))}
    </BaseButton>
  )
}

export default HoverRippleButton

