"use client"

import type React from "react"
import { useState, useRef } from "react"
import BaseButton, { type BaseButtonProps } from "./base-button"
import "./styles/shatter-button.css"

interface ShatterButtonProps extends BaseButtonProps {
  shatterSpeed?: number
  reformDelay?: number
  shardCount?: number
}

interface Shard {
  id: number
  x: number
  y: number
  size: number
  angle: number
  distance: number
}

const ShatterButton: React.FC<ShatterButtonProps> = ({
  children,
  className = "",
  shatterSpeed = 0.5,
  reformDelay = 1000,
  shardCount = 15,
  ...props
}) => {
  const [isShattered, setIsShattered] = useState(false)
  const [shards, setShards] = useState<Shard[]>([])
  const [buttonContent, setButtonContent] = useState<React.ReactNode>(children)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isShattered) return

    props.onClick?.(e)

    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const newShards: Shard[] = []

    for (let i = 0; i < shardCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 100 + 50

      newShards.push({
        id: i,
        x: centerX,
        y: centerY,
        size: Math.random() * 20 + 10,
        angle,
        distance,
      })
    }

    setShards(newShards)
    setIsShattered(true)
    setButtonContent("")

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsShattered(false)
      setShards([])
      setButtonContent(children)
    }, reformDelay)
  }

  return (
    <div className="shatter-button-container">
      <BaseButton
        ref={buttonRef}
        className={`shatter-button ${className} ${isShattered ? "shattered" : ""}`}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </BaseButton>

      {isShattered &&
        shards.map((shard) => (
          <span
            key={shard.id}
            className="shatter-button__shard"
            style={
              {
                left: `${shard.x}px`,
                top: `${shard.y}px`,
                width: `${shard.size}px`,
                height: `${shard.size}px`,
                backgroundColor: props.backgroundColor || "#3b82f6",
                transform: `translate(-50%, -50%) rotate(${shard.angle}rad)`,
                animation: `shatterFly ${shatterSpeed}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.2}s`,
                "--distance-x": `${Math.cos(shard.angle) * shard.distance}px`,
                "--distance-y": `${Math.sin(shard.angle) * shard.distance}px`,
              } as React.CSSProperties
            }
          />
        ))}
    </div>
  )
}

export default ShatterButton

