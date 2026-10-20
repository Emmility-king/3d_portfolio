import { useState, useEffect } from 'react'
import { ThreeBackground } from './components/canvas/ThreeBackground'
import { CustomCursor } from './components/ui/CustomCursor'
import { Navbar } from './components/ui/Navbar'
import { ScrollHUD } from './components/ui/ScrollHUD'
import { Hero } from './components/ui/Hero'
import { SkillsSection } from './components/ui/SkillsSection'
import { ExperienceSection } from './components/ui/ExperienceSection'
import { ProjectsSection } from './components/ui/ProjectsSection'
import { LeadershipSection } from './components/ui/LeadershipSection'
import { ContactSection } from './components/ui/ContactSection'
import { CVModal } from './components/ui/CVModal'
import { Footer } from './components/ui/Footer'

export function App() {
  const [activeSection, setActiveSection] = useState<string>('about')
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false)

  // Scroll section spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'leadership', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* 3D WebGL Background Scene */}
      <ThreeBackground themeColor="#38bdf8" />

      {/* Reactive 3D Custom Cursor */}
      <CustomCursor />

      {/* Persistent Floating Navigation */}
      <Navbar
        activeSection={activeSection}
        onSectionClick={handleNavigate}
      />

      {/* Scroll Progress & Waypoint HUD */}
      <ScrollHUD
        activeSection={activeSection}
        onSectionClick={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 max-w-7xl mx-auto">
        <Hero
          onNavigate={handleNavigate}
          onOpenCVModal={() => setIsCVModalOpen(true)}
        />

        <SkillsSection />

        <ExperienceSection />

        <ProjectsSection />

        <LeadershipSection />

        <ContactSection />
      </main>

      {/* Interactive CV Document Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      {/* Footer with Lagos Time */}
      <Footer />
    </div>
  )
}

export default App
