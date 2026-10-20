import React, { useState, useEffect } from 'react'
import { sound } from '../../utils/audio'

interface ScrollHUDProps {
  activeSection: string
  onSectionClick: (id: string) => void
}

export const ScrollHUD: React.FC<ScrollHUDProps> = ({ activeSection, onSectionClick }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sections = [
    { id: 'about', label: 'Intro' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-slate-950/40">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 shadow-[0_0_12px_#38bdf8] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Right Side 3D Navigation Waypoints (Desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end space-y-3 pointer-events-auto">
        <div className="px-2 py-1 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-400 mb-2">
          {Math.round(scrollProgress)}% DEPTH
        </div>
        {sections.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <button
              key={sec.id}
              onClick={() => {
                sound.playClick()
                onSectionClick(sec.id)
              }}
              onMouseEnter={() => sound.playHover()}
              className="group flex items-center space-x-2 text-right"
              title={sec.label}
            >
              <span
                className={`text-[10px] font-mono transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                  isActive ? 'text-cyan-300 font-bold opacity-100' : 'text-slate-400'
                }`}
              >
                {sec.label}
              </span>
              <div
                className={`transition-all duration-200 rounded-full border ${
                  isActive
                    ? 'w-3 h-3 bg-cyan-400 border-cyan-300 shadow-[0_0_10px_#38bdf8] scale-125'
                    : 'w-2 h-2 bg-slate-800 border-slate-700 group-hover:border-cyan-500'
                }`}
              />
            </button>
          )
        })}
      </div>
    </>
  )
}
