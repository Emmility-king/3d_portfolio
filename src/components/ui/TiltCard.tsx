import React, { useRef, useState } from 'react'
import { sound } from '../../utils/audio'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glowColor?: string
  onClick?: () => void
  interactive?: boolean
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  intensity = 15,
  glowColor = 'rgba(56, 189, 248, 0.15)',
  onClick,
  interactive = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState<string>('')
  const [glowPos, setGlowPos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -intensity
    const rotateY = ((x - centerX) / centerX) * intensity

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`)
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    })
  }

  const handleMouseEnter = () => {
    if (interactive) {
      sound.playHover()
    }
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)')
    setGlowPos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform,
        transition: transform ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
      }}
      className={`relative transform-gpu will-change-transform ${className}`}
      data-interactive={interactive ? 'true' : undefined}
    >
      {/* Dynamic Cursor Light Spot on Card Surface */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`
        }}
      />
      {children}
    </div>
  )
}
