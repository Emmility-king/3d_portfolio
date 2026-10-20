import React, { useState } from 'react'
import { PORTFOLIO_DATA } from '../../data/portfolioData'
import type { ProjectItem } from '../../data/portfolioData'
import { sound } from '../../utils/audio'
import { TiltCard } from './TiltCard'
import { ProjectModal } from './ProjectModal'
import { Code, ArrowUpRight } from 'lucide-react'

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All')
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null)

  const categories = ['All', 'Full Stack', 'AI & Data', 'Web & LMS', 'Mobile & Security']

  const filteredProjects =
    filter === 'All'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
            <Code className="w-3.5 h-3.5" />
            <span>FEATURED PRODUCTION REPOSITORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Engineered Deployments
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click any project to inspect architectural highlights, tech stacks, and live links. Every card interacts with mouse tilt and scroll motion.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat)
                sound.playClick()
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 border ${
                filter === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              intensity={14}
              glowColor={`${project.accentColor}25`}
              onClick={() => {
                sound.playClick()
                setActiveModalProject(project)
              }}
              className="p-6 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-2xl flex flex-col justify-between cursor-pointer group hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Card Top row */}
                <div className="flex items-center justify-between">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold"
                    style={{
                      backgroundColor: `${project.accentColor}18`,
                      color: project.accentColor
                    }}
                  >
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Project Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-400/90 font-medium mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Description snippet */}
                <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Technology Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-slate-500">Click to view architecture</span>
                <span className="text-cyan-400 font-semibold group-hover:underline">
                  Inspect &rarr;
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Detailed Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  )
}
