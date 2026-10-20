import React, { useState } from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import { sound } from '../../utils/audio'
import { TiltCard } from './TiltCard'
import {
  Code2,
  Server,
  Database,
  Cpu,
  Smartphone,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2
} from 'lucide-react'

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeSkill, setActiveSkill] = useState<{ name: string; level: number } | null>(null)

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />
      case 'Server':
        return <Server className="w-5 h-5" />
      case 'Database':
        return <Database className="w-5 h-5" />
      case 'Cpu':
        return <Cpu className="w-5 h-5" />
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />
      case 'Layers':
      default:
        return <Layers className="w-5 h-5" />
    }
  }

  const filteredCategories =
    selectedCategory === 'All'
      ? PORTFOLIO_DATA.skills
      : PORTFOLIO_DATA.skills.filter((c) => c.title.toLowerCase().includes(selectedCategory.toLowerCase()))

  const categoryFilters = ['All', 'Frontend', 'Backend', 'Databases', 'DevOps', 'Mobile', 'CMS']

  return (
    <section id="skills" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Architectural & Engineering Skills
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Hover over cards to activate 3D cursor tilt. Explore verified competencies across modern web, cloud deployments, mobile, and distributed systems.
          </p>
          {activeSkill && (
            <div className="inline-block px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              Active Focus: {activeSkill.name} ({activeSkill.level}% benchmark)
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat)
                sound.playClick()
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <TiltCard
              key={category.title}
              intensity={12}
              glowColor="rgba(56, 189, 248, 0.12)"
              className="p-6 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 transition-colors"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform shadow-inner"
                      style={{ color: category.color }}
                    >
                      {getIcon(category.icon)}
                    </div>
                    <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {category.skills.length} Techs
                  </span>
                </div>

                {/* Skill Bars */}
                <div className="space-y-3.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => {
                        setActiveSkill(skill)
                        sound.playHover()
                      }}
                      onMouseLeave={() => setActiveSkill(null)}
                      className="space-y-1.5 cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300 flex items-center space-x-1.5">
                          {skill.highlight && (
                            <Sparkles className="w-3 h-3 text-cyan-400 inline" />
                          )}
                          <span>{skill.name}</span>
                        </span>
                        <span className="font-mono text-slate-400">{skill.level}%</span>
                      </div>

                      {/* Progress Track */}
                      <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${category.color}80, ${category.color})`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag note */}
              <div className="mt-6 pt-4 border-t border-slate-900/90 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified in production</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
