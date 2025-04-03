"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/friction-button.css"

interface FrictionButtonProps extends BaseButtonProps {
  friction?: number
  dragEnabled?: boolean
  snapBack?: boolean
  maxDistance?: number
  snapBackSpeed?: number
}

const FrictionButton: React.FC<FrictionButtonProps> = ({
  children,
  className = "",
  friction = 0.85,
  dragEnabled = true,
  snapBack = true,
  maxDistance = 200,
  snapBackSpeed = 0.1,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const lastPositionRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const startPositionRef = useRef({ x: 0, y: 0 })

  // Animation loop for physics
  useEffect(() => {
    const animate = () => {
      if (!isDragging && (velocity.x !== 0 || velocity.y !== 0 || position.x !== 0 || position.y !== 0)) {
        // Apply friction to velocity
        const newVelocity = {
          x: velocity.x * friction,
          y: velocity.y * friction,
        }

        // Update position based on velocity
        let newPosition = {
          x: position.x + newVelocity.x,
          y: position.y + newVelocity.y,
        }

        // Apply snap back if enabled
        if (snapBack) {
          newPosition = {
            x: newPosition.x + (0 - newPosition.x) * snapBackSpeed,
            y: newPosition.y + (0 - newPosition.y) * snapBackSpeed,
          }
        }

        // Stop animation when velocity and position are very small
        if (
          Math.abs(newVelocity.x) < 0.01 &&
          Math.abs(newVelocity.y) < 0.01 &&
          Math.abs(newPosition.x) < 0.1 &&
          Math.abs(newPosition.y) < 0.1 &&
          snapBack
        ) {
          setPosition({ x: 0, y: 0 })
          setVelocity({ x: 0, y: 0 })
        } else {
          setPosition(newPosition)
          setVelocity(newVelocity)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, velocity, position, friction, snapBack, snapBackSpeed])

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!dragEnabled) return

    setIsDragging(true)
    startPositionRef.current = { x: e.clientX, y: e.clientY }
    lastPositionRef.current = { x: e.clientX, y: e.clientY }

    // Prevent default to avoid text selection during drag
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !dragEnabled) return

    const deltaX = e.clientX - lastPositionRef.current.x
    const deltaY = e.clientY - lastPositionRef.current.y

    // Calculate new position
    const newX = position.x + deltaX
    const newY = position.y + deltaY

    // Limit maximum distance
    const distance = Math.sqrt(newX * newX + newY * newY)
    if (distance > maxDistance) {
      const scale = maxDistance / distance
      setPosition({
        x: newX * scale,
        y: newY * scale,
      })
    } else {
      setPosition({ x: newX, y: newY })
    }

    // Update velocity
    setVelocity({
      x: deltaX,
      y: deltaY,
    })

    lastPositionRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove as any)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="friction-button-container">
      <BaseButton
        ref={buttonRef}
        className={`friction-button ${className} ${isDragging ? "is-dragging" : ""}`}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: dragEnabled ? "grab" : "pointer",
        }}
        {...props}
      >
        {children}
      </BaseButton>
    </div>
  )
}

export default FrictionButton

