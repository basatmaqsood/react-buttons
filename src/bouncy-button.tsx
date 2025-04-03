"use client"

import type React from "react"
import { useState } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/bouncy-button.css"

interface BouncyButtonProps extends BaseButtonProps {
  bounceHeight?: number
  bounceSpeed?: number
  bounceEasing?: string
  bounceCount?: number
}

const BouncyButton: React.FC<BouncyButtonProps> = ({
  children,
  className = "",
  bounceHeight = 20,
  bounceSpeed = 0.3,
  bounceEasing = "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  bounceCount = 2,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return

    setIsAnimating(true)

    // Reset animation after it completes
    setTimeout(
      () => {
        setIsAnimating(false)
      },
      bounceSpeed * 1000 * (bounceCount + 1),
    )

    // Call the original onClick handler if provided
    props.onClick?.(e)
  }

  return (
    <BaseButton
      className={`bouncy-button ${className} ${isAnimating ? "is-animating" : ""}`}
      onClick={handleClick}
      {...props}
    >
      {children}

      <style jsx>{`
        .bouncy-button.is-animating {
          animation: bounce ${bounceSpeed * bounceCount}s ${bounceEasing};
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          ${50 / bounceCount}% {
            transform: translateY(-${bounceHeight}px);
          }
          ${75 / bounceCount}% {
            transform: translateY(-${bounceHeight / 4}px);
          }
        }
      `}</style>
    </BaseButton>
  )
}

export default BouncyButton

