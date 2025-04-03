"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/ghost-trail-button.css"

interface GhostTrailButtonProps extends BaseButtonProps {
  trailColor?: string
  trailDuration?: number
  trailSize?: number
}

interface Trail {
  id: number
  x: number
  y: number
}

const GhostTrailButton: React.FC<GhostTrailButtonProps> = ({
  children,
  className = "",
  trailColor = "rgba(255, 255, 255, 0.5)",
  trailDuration = 0.8,
  trailSize = 20,
  ...props
}) => {
  const [trails, setTrails] = useState<Trail[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const nextId = useRef(0)
  const lastPos = useRef({ x: 0, y: 0 })
  const frameId = useRef<number | null>(null)

  const createTrail = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Only create a trail if the mouse has moved enough
    const distance = Math.sqrt(Math.pow(x - lastPos.current.x, 2) + Math.pow(y - lastPos.current.y, 2))

    if (distance > 5) {
      const newTrail = {
        id: nextId.current,
        x,
        y,
      }

      nextId.current += 1
      setTrails((prevTrails) => [...prevTrails, newTrail])

      // Remove trail after animation completes
      setTimeout(() => {
        setTrails((prevTrails) => prevTrails.filter((trail) => trail.id !== newTrail.id))
      }, trailDuration * 1000)

      lastPos.current = { x, y }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (frameId.current) {
      cancelAnimationFrame(frameId.current)
    }

    frameId.current = requestAnimationFrame(() => {
      createTrail(e)
    })
  }

  const handleMouseLeave = () => {
    if (frameId.current) {
      cancelAnimationFrame(frameId.current)
      frameId.current = null
    }
  }

  return (
    <BaseButton
      ref={buttonRef}
      className={`ghost-trail-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="ghost-trail-button__content">{children}</span>
      {trails.map((trail) => (
        <span
          key={trail.id}
          className="ghost-trail-button__trail"
          style={{
            left: trail.x,
            top: trail.y,
            width: trailSize,
            height: trailSize,
            backgroundColor: trailColor,
            animationDuration: `${trailDuration}s`,
          }}
        />
      ))}
    </BaseButton>
  )
}

export default GhostTrailButton

