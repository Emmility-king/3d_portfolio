import React, { useState, useEffect } from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { sound } from '../../utils/audio'
import { Interactive3DViewer } from '../canvas/Interactive3DViewer'
import { ArrowRight, Download, MapPin, ExternalLink, Mail, Phone } from 'lucide-react'
import { GithubIcon } from './Icons'

interface HeroProps {
  onNavigate: (sectionId: string) => void
  onOpenCVModal: () => void
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenCVModal }) => {
  const [typedTitle, setTypedTitle] = useState<string>('')
  const titles = [
    'Full Stack Engineer',
    'Senior Frontend Specialist',
    'React.js & Node.js Architect',
    'Cloud Systems Builder'
  ]
  const [titleIndex, setTitleIndex] = useState<number>(0)
  const [charIndex, setCharIndex] = useState<number>(0)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  // Typing animation effect
  useEffect(() => {
    const current = titles[titleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < current.length) {
            setTypedTitle(current.substring(0, charIndex + 1))
            setCharIndex(charIndex + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 1800)
          }
        } else {
          if (charIndex > 0) {
            setTypedTitle(current.substring(0, charIndex - 1))
            setCharIndex(charIndex - 1)
          } else {
            setIsDeleting(false)
            setTitleIndex((titleIndex + 1) % titles.length)
          }
        }
      },
      isDeleting ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, titleIndex])

  return (
    <section id="about" className="relative min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Biography & Actions */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Status badge */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono backdrop-blur-md shadow-lg shadow-emerald-950/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Open for Remote & On-Site Roles in Lagos & Worldwide</span>
          </div>

          {/* Headline Name */}
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-mono text-cyan-400 tracking-widest uppercase">
              // HELLO WORLD • ENGINEER PORTFOLIO
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Olafisoye-Oragbade <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Oluwatobi Emmanuel
              </span>
            </h1>
            <div className="text-lg sm:text-xl font-mono text-slate-300 flex items-center space-x-2 h-8">
              <span className="text-cyan-400">&gt;</span>
              <span className="font-semibold text-white">{typedTitle}</span>
              <span className="w-2 h-5 bg-cyan-400 inline-block animate-pulse" />
            </div>
          </div>

          {/* Professional summary text */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl bg-slate-950/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
            {PORTFOLIO_DATA.personal.summary}
          </p>

          {/* Quick contact tokens */}
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{PORTFOLIO_DATA.personal.email}</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>08144563800</span>
            </span>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick()
                onNavigate('projects')
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span>Explore 3D Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick()
                onOpenCVModal()
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 font-medium text-sm flex items-center space-x-2 transition-all duration-200 hover:border-cyan-400"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Inspect CV Document</span>
            </button>

            <button
              onClick={() => {
                sound.playClick()
                onNavigate('contact')
              }}
              onMouseEnter={() => sound.playHover()}
              className="px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800 font-medium text-sm flex items-center space-x-2 transition-all"
            >
              <span>Initialize Contact</span>
            </button>
          </div>

          {/* Quantitative Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-900">
            {PORTFOLIO_DATA.personal.stats.map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Interactive Lab Widget */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <Interactive3DViewer />

          {/* Fast Links Box */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
            <span className="text-slate-400">Live Profiles:</span>
            <div className="flex items-center space-x-3">
              <a
                href={PORTFOLIO_DATA.personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center space-x-1 text-slate-300 hover:text-cyan-400 transition"
              >
                <GithubIcon className="w-3.5 h-3.5 inline" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={PORTFOLIO_DATA.personal.mediumUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="text-slate-300 hover:text-emerald-400 transition"
              >
                Medium
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={PORTFOLIO_DATA.personal.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center space-x-1 text-slate-300 hover:text-indigo-400 transition"
              >
                <span>Vercel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
