import React, { useState, useEffect } from 'react'
import { sound } from '../../utils/audio'
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

interface NavbarProps {
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionClick }) => {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.enabled)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Leadership', id: 'leadership' },
    { label: 'Contact', id: 'contact' }
  ]

  const handleNavClick = (id: string) => {
    sound.playClick()
    onSectionClick(id)
    setMobileMenuOpen(false)
  }

  const toggleSound = () => {
    const state = sound.toggle()
    setSoundEnabled(state)
  }

  const handleHireClick = () => {
    sound.playWarp()
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.2 }
    })
    onSectionClick('contact')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-950/40'
            : 'bg-slate-900/40 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('about')}
          className="flex items-center space-x-3 text-left group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
            <span className="font-mono text-base font-extrabold text-white">EO</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-slate-950" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Emmanuel Olafisoye
            </div>
            <div className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
              Full Stack Engineer
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => sound.playHover()}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-500/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => sound.playHover()}
            title={soundEnabled ? 'Audio FX Enabled' : 'Enable Futuristic Audio FX'}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              soundEnabled
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'border-slate-800 bg-slate-900/70 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">SFX ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">SFX OFF</span>
              </>
            )}
          </button>

          {/* Hire / Contact CTA */}
          <button
            onClick={handleHireClick}
            onMouseEnter={() => sound.playHover()}
            className="relative px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-cyan-500/20 shadow-2xl space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-cyan-500/15 text-cyan-300 font-bold'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
