import React, { useEffect, useState, useRef } from 'react'

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    // Only enable custom cursor if fine pointer (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    setVisible(true)

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let velX = 0
    let velY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive]')
        setIsHovered(!!interactive)
      }
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    // Smooth animation loop for trailing ring with velocity stretching
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)

      // Spring physics towards mouse
      const dx = mouseX - ringX
      const dy = mouseY - ringY
      velX = dx * 0.15
      velY = dy * 0.15
      ringX += velX
      ringY += velY

      const speed = Math.hypot(velX, velY)
      const angle = Math.atan2(velY, velX)
      const scaleX = Math.min(1 + speed * 0.04, 1.8)
      const scaleY = Math.max(1 - speed * 0.02, 0.6)

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 transition-opacity duration-150 will-change-transform shadow-[0_0_10px_#38bdf8] ${
          clicked ? 'scale-75 bg-emerald-400' : ''
        }`}
      />

      {/* Trailing Luminous Magnetic Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border will-change-transform transition-[border-color,background-color,width,height] duration-200 ${
          isHovered
            ? 'w-12 h-12 border-cyan-400/90 bg-cyan-400/15 backdrop-blur-[1px] shadow-[0_0_20px_rgba(56,189,248,0.4)]'
            : 'w-8 h-8 border-cyan-500/40 bg-transparent'
        } ${clicked ? 'scale-90 border-emerald-400 bg-emerald-400/20' : ''}`}
      />
    </div>
  )
}
