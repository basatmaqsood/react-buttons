"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/magnetic-repel-button.css"

interface MagneticRepelButtonProps extends BaseButtonProps {
  repelStrength?: number
  maxDisplacement?: number
  returnSpeed?: number
}

const MagneticRepelButton: React.FC<MagneticRepelButtonProps> = ({
  children,
  className = "",
  repelStrength = 0.5,
  maxDisplacement = 30,
  returnSpeed = 0.3,
  ...props
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMoving = useRef(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || !containerRef.current || isMoving.current) return

    const buttonRect = buttonRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    // Calculate the center of the button
    const buttonCenterX = buttonRect.width / 2
    const buttonCenterY = buttonRect.height / 2

    // Calculate the mouse position relative to the container
    const mouseX = e.clientX - containerRect.left
    const mouseY = e.clientY - containerRect.top

    // Calculate the distance from the mouse to the button center
    const distanceX = mouseX - (buttonCenterX + position.x)
    const distanceY = mouseY - (buttonCenterY + position.y)
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Calculate the repel force (stronger when closer to the button)
    const repelRadius = Math.max(buttonRect.width, buttonRect.height) * 2

    if (distance < repelRadius) {
      const force = (1 - distance / repelRadius) * repelStrength

      // Calculate the repel direction (away from the mouse)
      const angle = Math.atan2(distanceY, distanceX)
      const repelX = -Math.cos(angle) * force * maxDisplacement
      const repelY = -Math.sin(angle) * force * maxDisplacement

      // Apply the repel effect with limits
      setPosition({
        x: Math.max(-maxDisplacement, Math.min(maxDisplacement, repelX)),
        y: Math.max(-maxDisplacement, Math.min(maxDisplacement, repelY)),
      })
    }
  }

  const handleMouseLeave = () => {
    isMoving.current = true

    // Return to original position
    const startPosition = { ...position }
    const startTime = Date.now()
    const duration = returnSpeed * 1000

    const animateReturn = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      setPosition({
        x: startPosition.x * (1 - easeProgress),
        y: startPosition.y * (1 - easeProgress),
      })

      if (progress < 1) {
        requestAnimationFrame(animateReturn)
      } else {
        isMoving.current = false
      }
    }

    requestAnimationFrame(animateReturn)
  }

  return (
    <div
      className="magnetic-repel-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <BaseButton
        ref={buttonRef}
        className={`magnetic-repel-button ${className}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        {...props}
      >
        {children}
      </BaseButton>
    </div>
  )
}

export default MagneticRepelButton

