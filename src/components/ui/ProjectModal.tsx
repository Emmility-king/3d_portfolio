import React, { useEffect } from 'react'
import type { ProjectItem } from '../../data/portfolioData'
import { sound } from '../../utils/audio'
import { X, ExternalLink, CheckCircle2, Sparkles, Cpu } from 'lucide-react'
import { GithubIcon } from './Icons'
import confetti from 'canvas-confetti'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (project) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [project, onClose])

  if (!project) return null

  const handleCelebrate = () => {
    sound.playWarp()
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl z-10 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick()
            onClose()
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold"
              style={{
                backgroundColor: `${project.accentColor}20`,
                color: project.accentColor
              }}
            >
              {project.category}
            </span>
            {project.metrics && (
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                {project.metrics}
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-cyan-400">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
          {project.description}
        </p>

        {/* Key Architectural Highlights */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Architecture & Engineering Highlights:</span>
          </h4>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Engineered With:
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={handleCelebrate}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-mono flex items-center space-x-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Confetti</span>
            </button>
          </div>

          <div className="flex gap-2">
            <a
              href="https://github.com/Emmility-king"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono flex items-center space-x-1.5 transition"
            >
              <GithubIcon className="w-3.5 h-3.5 inline" />
              <span>View Code</span>
            </a>
            <a
              href="https://emmanuelolafisoyecom.vercel.app/"
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono flex items-center space-x-1.5 transition hover:scale-105"
            >
              <span>Live Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
