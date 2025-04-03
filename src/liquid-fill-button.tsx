"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/liquid-fill-button.css"

interface LiquidFillButtonProps extends BaseButtonProps {
  liquidColor?: string
  fillDirection?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | "center"
  fillSpeed?: number
  textColor?: string
  hoverTextColor?: string
}

const LiquidFillButton: React.FC<LiquidFillButtonProps> = ({
  children,
  className = "",
  liquidColor = "#3b82f6",
  fillDirection = "left-to-right",
  fillSpeed = 0.5,
  textColor = "currentColor",
  hoverTextColor = "white",
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true)

    if (fillDirection === "center" && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setPosition({ x, y })
    }
  }

  const liquidStyle = {
    backgroundColor: liquidColor,
    transition: `clip-path ${fillSpeed}s ease`,
    clipPath: isHovered ? "circle(150% at center)" : getInitialClipPath(),
    "--x": `${position.x}px`,
    "--y": `${position.y}px`,
  } as React.CSSProperties

  function getInitialClipPath() {
    switch (fillDirection) {
      case "left-to-right":
        return "circle(0% at left)"
      case "right-to-left":
        return "circle(0% at right)"
      case "top-to-bottom":
        return "circle(0% at top)"
      case "bottom-to-top":
        return "circle(0% at bottom)"
      case "center":
        return "circle(0% at var(--x) var(--y))"
      default:
        return "circle(0% at left)"
    }
  }

  return (
    <BaseButton
      ref={buttonRef}
      className={`liquid-fill-button ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: isHovered ? hoverTextColor : textColor,
        transition: `color ${fillSpeed}s ease`,
      }}
      {...props}
    >
      <span className="liquid-fill-button__content">{children}</span>
      <span className="liquid-fill-button__liquid" style={liquidStyle} />
    </BaseButton>
  )
}

export default LiquidFillButton

