"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/orbiting-button.css"

interface OrbitingButtonProps extends BaseButtonProps {
  orbitSpeed?: number
  orbitSize?: number
  onClickEffect?: "explode" | "spin" | "disappear" | "converge"
  orbitCount?: number
  orbitColor?: string | string[]
  orbitShape?: "circle" | "square" | "triangle" | "star"
  orbitVariation?: boolean
}

interface Orbiter {
  id: number
  angle: number
  size: number
  color: string
  distance: number
  shape: "circle" | "square" | "triangle" | "star"
}

const OrbitingButton: React.FC<OrbitingButtonProps> = ({
  children,
  className = "",
  orbitSpeed = 5,
  orbitSize = 80,
  onClickEffect = "explode",
  orbitCount = 6,
  orbitColor,
  orbitShape = "circle",
  orbitVariation = true,
  ...props
}) => {
  const [orbiters, setOrbiters] = useState<Orbiter[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [isOrbiting, setIsOrbiting] = useState(true)
  const animationRef = useRef<number | null>(null)
  const lastTime = useState(true)
  const lastTimeRef = useRef<number>(0)

  // Create orbiters
  useEffect(() => {
    const colors = Array.isArray(orbitColor)
      ? orbitColor
      : orbitColor
        ? [orbitColor]
        : ["#ff6b6b", "#4ecdc4", "#ffe66d", "#1a535c", "#ff9f1c", "#2ec4b6"]

    const shapes = orbitVariation ? ["circle", "square", "triangle", "star"] : [orbitShape]

    const newOrbiters = Array.from({ length: orbitCount }, (_, i) => ({
      id: i,
      angle: (i * 2 * Math.PI) / orbitCount,
      size: orbitVariation ? Math.random() * 6 + 4 : 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      distance: orbitVariation ? orbitSize * (0.8 + Math.random() * 0.4) : orbitSize,
      shape: shapes[Math.floor(Math.random() * shapes.length)] as "circle" | "square" | "triangle" | "star",
    }))

    setOrbiters(newOrbiters)
  }, [orbitCount, orbitColor, orbitShape, orbitSize, orbitVariation])

  // Animation loop for orbiting
  useEffect(() => {
    if (!isOrbiting) return

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time
      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      setOrbiters((prev) =>
        prev.map((orbiter) => ({
          ...orbiter,
          angle: orbiter.angle + (delta / 1000) * orbitSpeed,
        })),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        lastTimeRef.current = 0
      }
    }
  }, [orbitSpeed, isOrbiting])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return

    setIsAnimating(true)

    switch (onClickEffect) {
      case "explode":
        setIsOrbiting(false)
        setTimeout(() => {
          setIsAnimating(false)
          setIsOrbiting(true)
        }, 1000)
        break
      case "spin":
        setTimeout(() => {
          setIsAnimating(false)
        }, 1000)
        break
      case "disappear":
        setIsOrbiting(false)
        setTimeout(() => {
          setIsAnimating(false)
          setIsOrbiting(true)
        }, 1000)
        break
      case "converge":
        setIsOrbiting(false)
        setTimeout(() => {
          setIsAnimating(false)
          setIsOrbiting(true)
        }, 1000)
        break
    }

    props.onClick?.(e)
  }

  const renderOrbiterShape = (orbiter: Orbiter) => {
    switch (orbiter.shape) {
      case "square":
        return (
          <div
            className="orbiting-button__orbiter orbiting-button__orbiter--square"
            style={{
              width: orbiter.size,
              height: orbiter.size,
              backgroundColor: orbiter.color,
            }}
          />
        )
      case "triangle":
        return (
          <div
            className="orbiting-button__orbiter orbiting-button__orbiter--triangle"
            style={{
              borderLeft: `${orbiter.size / 2}px solid transparent`,
              borderRight: `${orbiter.size / 2}px solid transparent`,
              borderBottom: `${orbiter.size}px solid ${orbiter.color}`,
            }}
          />
        )
      case "star":
        return (
          <div
            className="orbiting-button__orbiter orbiting-button__orbiter--star"
            style={{
              width: orbiter.size,
              height: orbiter.size,
              backgroundColor: orbiter.color,
            }}
          />
        )
      case "circle":
      default:
        return (
          <div
            className="orbiting-button__orbiter orbiting-button__orbiter--circle"
            style={{
              width: orbiter.size,
              height: orbiter.size,
              backgroundColor: orbiter.color,
            }}
          />
        )
    }
  }

  return (
    <div className="orbiting-button-container">
      <BaseButton className={`orbiting-button ${className}`} onClick={handleClick} {...props}>
        {children}
      </BaseButton>

      {isOrbiting &&
        orbiters.map((orbiter) => (
          <div
            key={orbiter.id}
            className={`orbiting-button__orbiter-wrapper ${isAnimating ? `effect-${onClickEffect}` : ""}`}
            style={
              {
                transform: `translate(-50%, -50%) rotate(${orbiter.angle}rad) translateX(${orbiter.distance}px)`,
                "--angle": `${orbiter.angle + Math.PI}rad`,
                "--distance": `${orbiter.distance * 3}px`,
                "--original-distance": `${orbiter.distance}px`,
              } as React.CSSProperties
            }
          >
            {renderOrbiterShape(orbiter)}
          </div>
        ))}
    </div>
  )
}

export default OrbitingButton

