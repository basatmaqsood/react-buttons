import type React from "react"
import type { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react"
import "./styles/base-button.css"

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  backgroundColor?: string
  textColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  size?: "sm" | "md" | "lg"
  borderRadius?: string
  padding?: string
  fontSize?: string
  fontWeight?: string | number
  boxShadow?: string
  transition?: string
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  className = "",
  backgroundColor,
  textColor,
  hoverBackgroundColor,
  hoverTextColor,
  size = "md",
  borderRadius,
  padding,
  fontSize,
  fontWeight,
  boxShadow,
  transition = "all 0.3s ease",
  style,
  ...props
}) => {
  const sizeClasses = {
    sm: "base-button--sm",
    md: "base-button--md",
    lg: "base-button--lg",
  }

  const buttonClasses = ["base-button", sizeClasses[size], className].filter(Boolean).join(" ")

  const buttonStyle: CSSProperties = {
    backgroundColor,
    color: textColor,
    borderRadius,
    padding,
    fontSize,
    fontWeight,
    boxShadow,
    transition,
    ...style,
  }

  return (
    <button className={buttonClasses} style={buttonStyle} {...props}>
      {children}
    </button>
  )
}

export default BaseButton

