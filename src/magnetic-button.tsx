"use client"

import type React from "react"
import { useState, useRef, useEffect, type CSSProperties, type ReactNode } from "react"

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  radius?: number
  returnSpeed?: number
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 50,
  radius = 100,
  returnSpeed = 300,
  className = "",
  style = {},
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Reset position when not hovering
  useEffect(() => {
    if (!isHovered) {
      setPosition({ x: 0, y: 0 })
    }
  }, [isHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()

    // Calculate the center of the button
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate the distance from the mouse to the center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Calculate the distance from the mouse to the center using Pythagorean theorem
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Only apply the effect if the mouse is within the radius
    if (distance < radius) {
      // Calculate the magnetic pull (stronger when closer to the button)
      const pull = (radius - distance) / radius

      // Apply the magnetic effect
      setPosition({
        x: distanceX * pull * (strength / 100),
        y: distanceY * pull * (strength / 100),
      })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      style={{
        ...style,
        position: "relative",
        display: "inline-block",
        padding: style.padding || "10px 20px",
        backgroundColor: style.backgroundColor || "#3498db",
        color: style.color || "white",
        border: style.border || "none",
        borderRadius: style.borderRadius || "4px",
        cursor: "pointer",
        overflow: "hidden",
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? "none" : `transform ${returnSpeed}ms ease`,
        fontWeight: (style.fontWeight as any) || "500",
        fontSize: style.fontSize || "16px",
        boxShadow: style.boxShadow || "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default MagneticButton

