"use client"

import type React from "react"
import { useState } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/neon-glow-button.css"

interface NeonGlowButtonProps extends BaseButtonProps {
  glowColor?: string
  glowIntensity?: number
  glowDuration?: number
  textColor?: string
}

const NeonGlowButton: React.FC<NeonGlowButtonProps> = ({
  children,
  className = "",
  glowColor = "#00ffff",
  glowIntensity = 1,
  glowDuration = 0.3,
  textColor,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Convert hex to rgba for shadow
  const hexToRgba = (hex: string, alpha: number) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const glowRgba = glowColor.startsWith("#") ? hexToRgba(glowColor, 0.8) : glowColor

  const buttonStyle = {
    color: textColor || glowColor,
    borderColor: glowColor,
    boxShadow: isHovered
      ? `0 0 5px ${glowRgba}, 0 0 ${10 * glowIntensity}px ${glowRgba}, 0 0 ${15 * glowIntensity}px ${glowRgba}, 0 0 ${20 * glowIntensity}px ${glowRgba}`
      : "none",
    textShadow: isHovered ? `0 0 5px ${glowRgba}, 0 0 ${10 * glowIntensity}px ${glowRgba}` : "none",
    transition: `all ${glowDuration}s ease-in-out`,
    border: `2px solid ${isHovered ? glowColor : "transparent"}`,
  }

  return (
    <BaseButton
      className={`neon-glow-button ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyle}
      {...props}
    >
      {children}
    </BaseButton>
  )
}

export default NeonGlowButton

