import React from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { TiltCard } from './TiltCard'
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react'

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Over 3 years of production engineering across university portals, healthcare platforms, learning management systems, and public tech training.
          </p>
        </div>

        {/* 3D Timeline Track */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
          {PORTFOLIO_DATA.experience.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Indicator Node */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-6 w-5 h-5 rounded-full border-4 border-slate-950 transition-all duration-300 group-hover:scale-125 ${
                  exp.current
                    ? 'bg-emerald-400 shadow-[0_0_15px_#10b981]'
                    : 'bg-cyan-500 shadow-[0_0_10px_#38bdf8]'
                }`}
              />

              {/* 3D Tilt Experience Card */}
              <TiltCard
                intensity={10}
                glowColor={exp.current ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.12)'}
                className={`p-6 sm:p-8 rounded-3xl bg-slate-950/70 border backdrop-blur-xl shadow-2xl transition-all ${
                  exp.current
                    ? 'border-emerald-500/30 group-hover:border-emerald-400/60'
                    : 'border-slate-800/80 group-hover:border-cyan-500/40'
                }`}
              >
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {exp.badge}
                        </span>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                            <span>CURRENT ROLE</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-cyan-400">
                        {exp.company}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-400 space-y-1 text-right">
                      <div className="flex items-center justify-end space-x-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center justify-end space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Role Overview */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-900/40 p-4 rounded-2xl border border-slate-900">
                    {exp.description}
                  </p>

                  {/* Bullet Achievements */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-mono text-slate-400 tracking-wider uppercase">
                      Key Deliverables & Responsibilities:
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-3 border-t border-slate-900 flex flex-wrap gap-2 items-center">
                    <span className="text-[11px] font-mono text-slate-500 mr-1">Stack:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
