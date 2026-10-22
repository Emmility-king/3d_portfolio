import React, { useState } from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { sound } from '../../utils/audio'
import { TiltCard } from './TiltCard'
import { InteractiveTerminal } from './InteractiveTerminal'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Lock
} from 'lucide-react'
import { GithubIcon } from './Icons'
import confetti from 'canvas-confetti'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    sound.playClick()
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSubmitting(true)
    sound.playKeypress()

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      sound.playWarp()
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      })
    }, 1200)
  }

  return (
    <section id="contact" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
            <Mail className="w-3.5 h-3.5" />
            <span>ESTABLISH UPLINK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Available for full-time engineering roles, high-impact consulting, or freelance full-stack architectures. Send a message or dispatch via terminal.
          </p>
        </div>

        {/* Contact Grid: Direct Info + Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Channel Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <TiltCard
              intensity={8}
              glowColor="rgba(56, 189, 248, 0.15)"
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between group hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">DIRECT EMAIL</div>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="text-sm font-bold text-white hover:text-cyan-400 transition"
                  >
                    {PORTFOLIO_DATA.personal.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title="Copy Email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </TiltCard>

            {/* Phone Cards */}
            {PORTFOLIO_DATA.personal.phoneNumbers.map((phone, i) => (
              <TiltCard
                key={phone}
                intensity={8}
                glowColor="rgba(16, 185, 129, 0.15)"
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between group hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">
                      PHONE / WHATSAPP ({i === 0 ? 'PRIMARY' : 'SECONDARY'})
                    </div>
                    <a
                      href={`tel:${phone}`}
                      className="text-sm font-bold text-white hover:text-emerald-400 transition font-mono"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(phone, `phone-${i}`)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Copy Phone Number"
                >
                  {copiedField === `phone-${i}` ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </TiltCard>
            ))}

            {/* Location Card */}
            <TiltCard
              intensity={8}
              glowColor="rgba(129, 140, 248, 0.15)"
              className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">LOCATION BASE</div>
                  <div className="text-sm font-bold text-white">
                    {PORTFOLIO_DATA.personal.location}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                UTC+1 (WAT)
              </span>
            </TiltCard>

            {/* Social & GitHub Links */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <a
                href={PORTFOLIO_DATA.personal.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 flex flex-col items-center justify-center space-y-1.5 text-center group transition"
              >
                <GithubIcon className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-white">GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.personal.mediumUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/50 flex flex-col items-center justify-center space-y-1.5 text-center group transition"
              >
                <MessageSquare className="w-5 h-5 text-slate-300 group-hover:text-emerald-400 transition" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-white">Medium</span>
              </a>

              <a
                href="https://emmanuel-portfolio-theta-ebon.vercel.app/"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 flex flex-col items-center justify-center space-y-1.5 text-center group transition"
              >
                <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition" />
                <span className="text-xs font-mono text-slate-400 group-hover:text-white">Vercel</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <TiltCard
              intensity={8}
              glowColor="rgba(56, 189, 248, 0.12)"
              className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl relative"
            >
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Transmission Dispatched!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Thank you for reaching out. Emmanuel will review your inquiry and respond promptly at{' '}
                    <span className="text-cyan-400 font-mono font-semibold">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', subject: '', message: '' })
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono transition"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="text-xs font-mono text-cyan-400 flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>ENCRYPTED MESSAGE DISPATCH PORTAL</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">256-BIT SECURE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@cyberdyne.io"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm outline-none focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Subject / Role Overview</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full Stack Engineering Role / Project Collaboration"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm outline-none focus:border-cyan-400 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Message Transmission *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about your team, tech stack, timeline, or requirements..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm outline-none focus:border-cyan-400 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="font-mono text-xs animate-pulse">TRANSMITTING OVER SECURE CHANNEL...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </TiltCard>
          </div>
        </div>

        {/* Embedded Interactive Hacker Terminal sandbox */}
        <div className="space-y-4 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Interactive Command-Line Terminal</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Feel free to run commands like <span className="text-cyan-300">skills</span>, <span className="text-cyan-300">projects</span>, <span className="text-cyan-300">cat cv.txt</span>, or <span className="text-cyan-300">confetti</span>!
            </p>
          </div>
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  )
}
