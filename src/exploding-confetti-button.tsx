"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/exploding-confetti-button.css"

interface ExplodingConfettiButtonProps extends BaseButtonProps {
  confettiCount?: number
  confettiColors?: string[]
  resetTime?: number
  confettiSize?: number
  explosionForce?: number
}

interface Confetti {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  rotationSpeed: number
  velocityX: number
  velocityY: number
  shape: "circle" | "square" | "triangle" | "line"
}

const ExplodingConfettiButton: React.FC<ExplodingConfettiButtonProps> = ({
  children,
  className = "",
  confettiCount = 100,
  confettiColors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#1a535c", "#ff9f1c", "#2ec4b6"],
  resetTime = 2000,
  confettiSize = 8,
  explosionForce = 1,
  ...props
}) => {
  const [isExploding, setIsExploding] = useState(false)
  const [confetti, setConfetti] = useState<Confetti[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isExploding) return

    props.onClick?.(e)

    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Generate confetti
    const newConfetti: Confetti[] = []
    const shapes: ("circle" | "square" | "triangle" | "line")[] = ["circle", "square", "triangle", "line"]

    for (let i = 0; i < confettiCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const force = (Math.random() * 10 + 5) * explosionForce
      const size = Math.random() * confettiSize + confettiSize / 2
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)]
      const shape = shapes[Math.floor(Math.random() * shapes.length)]

      newConfetti.push({
        id: i,
        x: centerX,
        y: centerY,
        size,
        color,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        velocityX: Math.cos(angle) * force,
        velocityY: Math.sin(angle) * force,
        shape,
      })
    }

    setConfetti(newConfetti)
    setIsExploding(true)

    // Hide button
    setTimeout(() => {
      setIsVisible(false)
    }, 100)

    // Reset after animation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsExploding(false)
      setConfetti([])
      setIsVisible(true)
    }, resetTime)

    // Animate confetti
    let frame = 0
    const gravity = 0.2
    const friction = 0.98

    const animateConfetti = () => {
      if (frame >= 60 * (resetTime / 1000)) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
        return
      }

      frame++

      setConfetti((prev) =>
        prev.map((piece) => ({
          ...piece,
          x: piece.x + piece.velocityX,
          y: piece.y + piece.velocityY,
          rotation: piece.rotation + piece.rotationSpeed,
          velocityX: piece.velocityX * friction,
          velocityY: piece.velocityY * friction + gravity,
        })),
      )

      animationRef.current = requestAnimationFrame(animateConfetti)
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    animationRef.current = requestAnimationFrame(animateConfetti)
  }

  const renderConfetti = (confetti: Confetti) => {
    switch (confetti.shape) {
      case "square":
        return (
          <div
            className="exploding-confetti__piece exploding-confetti__piece--square"
            style={{
              width: confetti.size,
              height: confetti.size,
              backgroundColor: confetti.color,
              transform: `rotate(${confetti.rotation}deg)`,
            }}
          />
        )
      case "triangle":
        return (
          <div
            className="exploding-confetti__piece exploding-confetti__piece--triangle"
            style={{
              borderLeft: `${confetti.size / 2}px solid transparent`,
              borderRight: `${confetti.size / 2}px solid transparent`,
              borderBottom: `${confetti.size}px solid ${confetti.color}`,
              transform: `rotate(${confetti.rotation}deg)`,
            }}
          />
        )
      case "line":
        return (
          <div
            className="exploding-confetti__piece exploding-confetti__piece--line"
            style={{
              width: confetti.size * 2,
              height: confetti.size / 3,
              backgroundColor: confetti.color,
              transform: `rotate(${confetti.rotation}deg)`,
            }}
          />
        )
      case "circle":
      default:
        return (
          <div
            className="exploding-confetti__piece exploding-confetti__piece--circle"
            style={{
              width: confetti.size,
              height: confetti.size,
              backgroundColor: confetti.color,
            }}
          />
        )
    }
  }

  return (
    <div className="exploding-confetti-container">
      <BaseButton
        ref={buttonRef}
        className={`exploding-confetti-button ${className} ${isExploding ? "is-exploding" : ""}`}
        onClick={handleClick}
        style={{ opacity: isVisible ? 1 : 0 }}
        {...props}
      >
        {children}
      </BaseButton>

      {isExploding &&
        confetti.map((piece) => (
          <div
            key={piece.id}
            className="exploding-confetti__wrapper"
            style={{
              left: piece.x,
              top: piece.y,
              transform: `translate(-50%, -50%)`,
            }}
          >
            {renderConfetti(piece)}
          </div>
        ))}
    </div>
  )
}

export default ExplodingConfettiButton

