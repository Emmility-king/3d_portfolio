import React from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { TiltCard } from './TiltCard'
import { GraduationCap, Award, Shield, Flag, Users } from 'lucide-react'

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIALS & CIVIC IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Education & Leadership
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Academic computer science grounding alongside military liaison service, democratic election presiding, and youth community development.
          </p>
        </div>

        {/* Two Column Grid: Education & Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm font-semibold tracking-wider uppercase border-b border-slate-800 pb-3">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <span>Academic Grounding & Certifications</span>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.education.map((edu, idx) => (
                <TiltCard
                  key={idx}
                  intensity={8}
                  glowColor="rgba(56, 189, 248, 0.1)"
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-lg space-y-2 group hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors text-base">
                        {edu.degree}
                      </h4>
                      <div className="text-xs text-cyan-400 font-medium">
                        {edu.institution}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {edu.details}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Leadership & Public Service Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-indigo-400 font-mono text-sm font-semibold tracking-wider uppercase border-b border-slate-800 pb-3">
              <Shield className="w-5 h-5 text-indigo-400" />
              <span>Civic Responsibility & Public Trust</span>
            </div>

            <div className="space-y-4">
              {PORTFOLIO_DATA.leadership.map((lead, idx) => (
                <TiltCard
                  key={idx}
                  intensity={8}
                  glowColor="rgba(129, 140, 248, 0.1)"
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-lg space-y-2 group hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors text-base flex items-center space-x-1.5">
                        {idx === 1 && <Flag className="w-4 h-4 text-emerald-400 inline" />}
                        {idx === 2 && <Shield className="w-4 h-4 text-cyan-400 inline" />}
                        {idx === 0 && <Users className="w-4 h-4 text-indigo-400 inline" />}
                        <span>{lead.title}</span>
                      </h4>
                      <div className="text-xs text-indigo-400 font-medium">
                        {lead.organization}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {lead.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {lead.description}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
