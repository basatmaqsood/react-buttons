"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/depth-perception-button.css"

interface DepthPerceptionButtonProps extends BaseButtonProps {
  rotationAngle?: number
  depth?: number
  shadowIntensity?: number
  perspective?: number
}

const DepthPerceptionButton: React.FC<DepthPerceptionButtonProps> = ({
  children,
  className = "",
  rotationAngle = 15,
  depth = 30,
  shadowIntensity = 0.2,
  perspective = 800,
  ...props
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !isHovered) return

    const rect = buttonRef.current.getBoundingClientRect()

    // Calculate the center of the button
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate the mouse position relative to the center
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate the rotation based on mouse position
    const rotateY = ((mouseX - centerX) / centerX) * rotationAngle
    const rotateX = -((mouseY - centerY) / centerY) * rotationAngle

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotation({ x: 0, y: 0 })
  }

  const wrapperStyle = {
    perspective: `${perspective}px`,
  }

  const buttonStyle = {
    transform: isHovered
      ? `translateZ(${depth}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      : "translateZ(0) rotateX(0) rotateY(0)",
    boxShadow: isHovered
      ? `0 ${10 * shadowIntensity}px ${20 * shadowIntensity}px rgba(0, 0, 0, ${shadowIntensity})`
      : `0 ${4 * shadowIntensity}px ${8 * shadowIntensity}px rgba(0, 0, 0, ${shadowIntensity / 2})`,
  }

  return (
    <div className="depth-perception-wrapper" style={wrapperStyle}>
      <BaseButton
        ref={buttonRef}
        className={`depth-perception-button ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={buttonStyle}
        {...props}
      >
        {children}
      </BaseButton>
    </div>
  )
}

export default DepthPerceptionButton

