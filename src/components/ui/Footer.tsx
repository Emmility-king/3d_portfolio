import React, { useState, useEffect } from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { sound } from '../../utils/audio'
import { ArrowUp, Clock } from 'lucide-react'
import { GithubIcon } from './Icons'

export const Footer: React.FC = () => {
  const [lagosTime, setLagosTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      // Lagos is West Africa Time (UTC+1)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      setLagosTime(new Intl.DateTimeFormat('en-US', options).format(new Date()))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToTop = () => {
    sound.playClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 px-4 border-t border-slate-900 bg-slate-950/80 backdrop-blur-xl text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-white font-bold text-sm">
            <span>{PORTFOLIO_DATA.personal.name}</span>
            <span className="text-cyan-400 font-mono">({PORTFOLIO_DATA.personal.nickname})</span>
          </div>
          <div className="text-slate-500">
            {PORTFOLIO_DATA.personal.title} • {PORTFOLIO_DATA.personal.location}
          </div>
        </div>

        {/* Center: Live Lagos Time */}
        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>LAGOS, NG: {lagosTime || '11:45 PM'} (WAT / UTC+1)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Right Side: Back to Top & Socials */}
        <div className="flex items-center space-x-4">
          <a
            href={PORTFOLIO_DATA.personal.githubUrl}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="hover:text-cyan-400 transition flex items-center space-x-1"
          >
            <GithubIcon className="w-3.5 h-3.5 inline" />
            <span>GitHub</span>
          </a>
          <span>•</span>
          <a
            href={PORTFOLIO_DATA.personal.portfolioUrl}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => sound.playHover()}
            className="hover:text-cyan-400 transition"
          >
            Vercel
          </a>
          <span>•</span>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 text-white transition flex items-center space-x-1"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
