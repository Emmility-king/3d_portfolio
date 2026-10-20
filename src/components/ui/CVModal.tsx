import React, { useEffect } from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { sound } from '../../utils/audio'
import { X, Printer } from 'lucide-react'

interface CVModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePrint = () => {
    sound.playClick()
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl z-10 space-y-8 text-left scrollbar-thin scrollbar-thumb-slate-700">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              Curriculum Vitae Document Inspector
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center space-x-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playClick()
                onClose()
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Content Paper */}
        <div className="bg-slate-950/90 p-6 sm:p-10 rounded-2xl border border-slate-800 space-y-8 font-sans">
          {/* Header */}
          <div className="space-y-3 border-b border-slate-800 pb-6 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              {PORTFOLIO_DATA.personal.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm text-cyan-300 font-mono">
              <span>{PORTFOLIO_DATA.personal.location}</span>
              <span>•</span>
              <span>{PORTFOLIO_DATA.personal.phoneNumbers.join(', ')}</span>
              <span>•</span>
              <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline">
                {PORTFOLIO_DATA.personal.email}
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 text-xs text-slate-400 font-mono pt-1">
              <a href={PORTFOLIO_DATA.personal.portfolioUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                {PORTFOLIO_DATA.personal.portfolioUrl}
              </a>
              <span>•</span>
              <a href={PORTFOLIO_DATA.personal.githubUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400">
                github.com/Emmility-king
              </a>
              <span>•</span>
              <span>Medium: @olafisoyeemmanuel7</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {PORTFOLIO_DATA.personal.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {PORTFOLIO_DATA.skills.map((c) => (
                <div key={c.title} className="space-y-1">
                  <span className="font-bold text-white">{c.title}:</span>{' '}
                  <span className="text-slate-300">
                    {c.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
              Work Experience
            </h2>
            <div className="space-y-5">
              {PORTFOLIO_DATA.experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-wrap justify-between items-baseline">
                    <span className="font-bold text-white text-sm">
                      {exp.role} <span className="text-cyan-400">| {exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
              Key Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {PORTFOLIO_DATA.projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-sm">{proj.title}</div>
                  <div className="text-slate-400">{proj.tagline}</div>
                  <div className="text-[11px] font-mono text-cyan-400">{proj.tags.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
              Education & Certifications
            </h2>
            <div className="space-y-2 text-xs">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <span className="font-bold text-white">{edu.degree}</span> –{' '}
                    <span className="text-slate-300">{edu.institution}</span>
                  </div>
                  <span className="text-slate-500 font-mono">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-2">
            <h2 className="text-sm font-mono font-bold text-cyan-400 tracking-wider uppercase border-b border-slate-800 pb-1">
              Leadership & Community Involvement
            </h2>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
              {PORTFOLIO_DATA.leadership.map((l, idx) => (
                <li key={idx}>
                  <strong className="text-white">{l.title}</strong> – {l.organization} ({l.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
