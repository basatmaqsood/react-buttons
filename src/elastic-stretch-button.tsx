"use client"

import type React from "react"
import { useState, type CSSProperties } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/elastic-stretch-button.css"

interface ElasticStretchButtonProps extends BaseButtonProps {
  stretchAmount?: number
  easing?: string
  borderRadius?: string
  direction?: "horizontal" | "vertical" | "both"
}

const ElasticStretchButton: React.FC<ElasticStretchButtonProps> = ({
  children,
  className = "",
  stretchAmount = 1.1,
  easing = "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  borderRadius = "inherit",
  direction = "horizontal",
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getTransform = () => {
    if (!isHovered) return "scale(1)"

    switch (direction) {
      case "horizontal":
        return `scaleX(${stretchAmount}) scaleY(1)`
      case "vertical":
        return `scaleX(1) scaleY(${stretchAmount})`
      case "both":
        return `scale(${stretchAmount})`
      default:
        return `scaleX(${stretchAmount}) scaleY(1)`
    }
  }

  const buttonStyle: CSSProperties = {
    transform: getTransform(),
    transition: `transform 0.5s ${easing}`,
    borderRadius: isHovered ? borderRadius : undefined,
  }

  return (
    <BaseButton
      className={`elastic-stretch-button ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyle}
      {...props}
    >
      <span className="elastic-stretch-button__content">{children}</span>
    </BaseButton>
  )
}

export default ElasticStretchButton

