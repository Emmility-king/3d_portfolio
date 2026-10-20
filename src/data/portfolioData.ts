export interface ProjectItem {
  id: string
  title: string
  tagline: string
  category: 'Full Stack' | 'AI & Data' | 'Web & LMS' | 'Mobile & Security'
  description: string
  highlights: string[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  metrics?: string
  accentColor: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  description: string
  achievements: string[]
  technologies: string[]
  badge: string
}

export interface SkillCategory {
  title: string
  icon: string
  color: string
  skills: {
    name: string
    level: number
    iconName?: string
    highlight?: boolean
  }[]
}

export interface LeadershipItem {
  title: string
  organization: string
  year: string
  description: string
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Olafisoye-Oragbade Oluwatobi Emmanuel",
    preferredName: "Emmanuel Olafisoye",
    nickname: "Emmility",
    title: "Senior Full Stack Engineer & Cloud Architect",
    location: "Lagos, Nigeria",
    phoneNumbers: ["08144563800", "09121206129"],
    email: "olafisoyeemmanuel7@gmail.com",
    portfolioUrl: "https://emmanuelolafisoyecom.vercel.app/",
    githubUrl: "https://github.com/Emmility-king",
    mediumUrl: "https://medium.com/@olafisoyeemmanuel7",
    summary: "Full Stack Engineer with over 3 years of hands-on experience building scalable web and mobile applications. Skilled in JavaScript, TypeScript, React.js, Node.js, and RESTful API development. Proficient in managing cloud deployments, securing user data, and optimizing application performance. Proven ability to work in fast-paced environments and deliver production-ready solutions. Open to opportunities in Lagos and available for remote or on-site roles.",
    availability: "Available for Full-Time, Remote & Contract Engagements",
    yearsExperience: "3+",
    stats: [
      { label: "Years Experience", value: "3+" },
      { label: "Engineered Projects", value: "10+" },
      { label: "Minds Mentored", value: "800+" },
      { label: "Code Quality & Uptime", value: "99.9%" }
    ]
  },

  skills: [
    {
      title: "Frontend Engineering",
      icon: "Code2",
      color: "#38bdf8",
      skills: [
        { name: "React.js", level: 95, highlight: true },
        { name: "Next.js", level: 92, highlight: true },
        { name: "TypeScript", level: 90, highlight: true },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML5 & CSS3", level: 98 },
        { name: "Vite.js", level: 92 }
      ]
    },
    {
      title: "Backend & Systems",
      icon: "Server",
      color: "#10b981",
      skills: [
        { name: "Node.js", level: 92, highlight: true },
        { name: "Express.js", level: 90 },
        { name: "RESTful APIs", level: 95, highlight: true },
        { name: "Python", level: 85 },
        { name: "Django", level: 82 },
        { name: "C Programming", level: 78 }
      ]
    },
    {
      title: "Databases & Storage",
      icon: "Database",
      color: "#f59e0b",
      skills: [
        { name: "PostgreSQL", level: 88, highlight: true },
        { name: "MongoDB", level: 90, highlight: true },
        { name: "MySQL", level: 92 }
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: "Cpu",
      color: "#818cf8",
      skills: [
        { name: "Docker", level: 85, highlight: true },
        { name: "AWS Cloud", level: 82 },
        { name: "Nginx", level: 86 },
        { name: "CI/CD Pipelines", level: 88 },
        { name: "Linux Servers", level: 90, highlight: true },
        { name: "Vercel & Netlify", level: 95 }
      ]
    },
    {
      title: "Mobile Development",
      icon: "Smartphone",
      color: "#ec4899",
      skills: [
        { name: "React Native", level: 88, highlight: true },
        { name: "Flutter", level: 82 },
        { name: "Mobile UI/UX", level: 86 }
      ]
    },
    {
      title: "CMS, Tools & Creative",
      icon: "Layers",
      color: "#a855f7",
      skills: [
        { name: "Git & GitHub", level: 95, highlight: true },
        { name: "WordPress", level: 88 },
        { name: "Webflow", level: 84 },
        { name: "Moodle LMS", level: 88 },
        { name: "Figma", level: 85 },
        { name: "Adobe Creative Suite", level: 82 }
      ]
    }
  ] as SkillCategory[],

  experience: [
    {
      id: "wellspring-hotview",
      role: "Senior System Analyst & Senior Frontend Developer",
      company: "Wellspring University & Hotview",
      location: "Benin City / Lagos, Nigeria",
      period: "June 2025 – Present",
      current: true,
      badge: "Lead Architecture",
      description: "Spearheading high-impact architectural modernization across university academic infrastructure, health systems, and proprietary proptech solutions.",
      achievements: [
        "Architected and deployed a unified modern university portal handling student lifecycle, registration, and academic workflows.",
        "Built and scaled a secure enterprise Health Management System with strict confidentiality and role-based access control.",
        "Engineered a high-concurrency Proptech web application featuring real-time property listings and interactive mapping.",
        "Enforced rigorous API security measures, audit logging, and vulnerability remediation to protect student & institutional data.",
        "Maintained overall institutional network topology, uptime, and high availability systems."
      ],
      technologies: ["React.js", "TypeScript", "Node.js", "Tailwind CSS", "RESTful APIs", "PostgreSQL", "Docker", "Linux Servers"]
    },
    {
      id: "moricol",
      role: "Full Stack Developer",
      company: "Moricol Healthcare LTD",
      location: "Lagos, Nigeria",
      period: "Feb 2025 – May 2025",
      badge: "Healthcare Tech",
      description: "Led digital product performance enhancements, web platform optimization, and custom automated internal tooling for healthcare services.",
      achievements: [
        "Maintained and optimized corporate healthcare platform, boosting Google Lighthouse performance scores and SEO search ranking.",
        "Developed custom internal dashboards and onboarding tooling that reduced client intake cycle times.",
        "Designed rich digital assets and integrated interactive campaign touchpoints driving increased patient engagement.",
        "Implemented secure patient contact pipelines adhering to healthcare privacy best practices."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "SEO Optimization", "REST APIs", "Tailwind CSS"]
    },
    {
      id: "ambrose-alli",
      role: "System Programmer & Full Stack Developer",
      company: "Ambrose Alli University & Kyrus Recycling",
      location: "Edo State, Nigeria",
      period: "Oct 2023 – Feb 2025",
      badge: "EdTech & Enterprise",
      description: "Delivered mission-critical academic systems including Teklearn LMS, examination grading engines, and institutional Linux infrastructure.",
      achievements: [
        "Engineered Teklearn LMS from the ground up using React.js, Node.js, and MySQL, serving thousands of concurrent university students.",
        "Built a robust academic result processing and reporting platform featuring cryptographically secure authentication and grade verification.",
        "Administered production Linux servers, automated patch management, and maintained 99.9% application uptime.",
        "Seamlessly integrated secure multi-channel payment gateways and Moodle e-learning environments."
      ],
      technologies: ["React.js", "Node.js", "MySQL", "Linux Servers", "Moodle", "Payment Gateways", "Express.js", "Docker"]
    },
    {
      id: "edo-tech4dev",
      role: "Frontend Developer & Technical Instructor",
      company: "Edo Innovates & Tech4Dev",
      location: "Benin City, Nigeria",
      period: "Feb 2023 – Oct 2023",
      badge: "Community & Education",
      description: "Empowered public servants and aspiring developers through practical technical curricula in web architecture and modern software development.",
      achievements: [
        "Trained over 800+ public servants and 100+ aspiring engineers in digital literacy, modern web engineering, and developer tooling.",
        "Delivered hands-on masterclasses covering HTML5, CSS3, modern JavaScript (ES6+), React.js, and collaborative Git workflows.",
        "Formulated real-world project assignments and mentored junior developers into successful technical career placements."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Git", "Developer Mentorship"]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "teklearn-lms",
      title: "Teklearn LMS",
      tagline: "Comprehensive Academic Learning Management & Examination Platform",
      category: "Web & LMS",
      description: "An enterprise-grade LMS developed for higher education, featuring full student lifecycle onboarding, curriculum delivery, interactive assignments, and secure timed examinations.",
      highlights: [
        "End-to-end student and lecturer portal with granular RBAC permissions.",
        "Automated grading and real-time result computation engine.",
        "Integrated payment gateway for tuition and course material settlements.",
        "Optimized MySQL schema handling high-concurrency exam submissions."
      ],
      tags: ["React.js", "Node.js", "MySQL", "Express.js", "REST APIs", "Tailwind CSS"],
      metrics: "Thousands of active students & automated exam scoring",
      accentColor: "#0284c7"
    },
    {
      id: "trashpoint",
      title: "TrashPoint",
      tagline: "Smart Waste Management & Recycling Exchange Platform",
      category: "Full Stack",
      description: "A modern web platform connecting citizens, waste collection operators, and recycling hubs to incentivize circular economy waste disposal.",
      highlights: [
        "Interactive dispatch map tracking real-time waste pickup requests.",
        "Reward points system encouraging community recycling compliance.",
        "Built with Next.js App Router for blazing-fast SSR performance.",
        "Robust Node.js backend managing geolocation clusters and driver routing."
      ],
      tags: ["Next.js", "Node.js", "MongoDB", "Geolocation API", "Tailwind CSS", "TypeScript"],
      metrics: "Streamlined waste pickup tracking & community rewards",
      accentColor: "#10b981"
    },
    {
      id: "neurorest-ai",
      title: "Neurorest-ai",
      tagline: "Predictive Cognitive AI System for Circadian Sleep Optimization",
      category: "AI & Data",
      description: "An advanced algorithmic AI platform that analyzes biometric circadian inputs, sleep cycle stages, and lifestyle indicators to predict fatigue and deliver personalized rest recommendations.",
      highlights: [
        "Cognitive sleep score predictive modeling based on circadian rhythm data.",
        "Interactive visual dashboard with sleep debt forecasting.",
        "Privacy-first biometric data encryption pipeline.",
        "Built with responsive interactive charts and real-time notifications."
      ],
      tags: ["Python", "React.js", "AI/ML Modeling", "FastAPI / Node", "Tailwind CSS", "TypeScript"],
      metrics: "Cognitive sleep prediction & circadian health insights",
      accentColor: "#8b5cf6"
    },
    {
      id: "churn-system",
      title: "Churn Prediction Intelligence System",
      tagline: "Enterprise Customer Churn Predictive Analytics Platform",
      category: "AI & Data",
      description: "A machine learning data analytics application engineered to identify at-risk customer accounts, visualize retention trends, and formulate automated mitigation strategies.",
      highlights: [
        "Predictive risk score computation utilizing multivariate data models.",
        "Interactive dashboard displaying cohort attrition curves and feature importances.",
        "CSV/Database ingestion pipeline supporting large customer datasets.",
        "Exportable business intelligence reports for executive stakeholders."
      ],
      tags: ["Python", "Data Science", "React.js", "RESTful API", "Chart.js", "PostgreSQL"],
      metrics: "Data-driven customer retention analytics",
      accentColor: "#f59e0b"
    },
    {
      id: "animated-portfolio",
      title: "Dynamic Kinetic Portfolio",
      tagline: "Interactive Web Experience with TypeScript, Motion & Headless CMS",
      category: "Full Stack",
      description: "A high-performance personal showcase website built using TypeScript, fluid micro-interactions, Framer Motion transitions, and Sanity CMS headless content pipeline.",
      highlights: [
        "Rich physics-based motion transitions and kinetic typography.",
        "Headless CMS integration for dynamic project and blog authoring.",
        "Flawless responsive design with custom dark aesthetic.",
        "High Lighthouse performance score across all devices."
      ],
      tags: ["TypeScript", "React.js", "Framer Motion", "Sanity CMS", "Tailwind CSS"],
      metrics: "Ultra-responsive headless architecture",
      accentColor: "#ec4899"
    },
    {
      id: "safeline",
      title: "Safeline Anonymous Portal",
      tagline: "End-to-End Encrypted Anonymous Crime Reporting Platform",
      category: "Mobile & Security",
      description: "A civic safety application allowing citizens to report safety emergencies and crimes with absolute anonymity, cryptographic metadata scrubbing, and geo-tagged incident routing.",
      highlights: [
        "Zero-knowledge architecture ensuring total whistleblower privacy.",
        "Automated metadata stripping from photographic and multimedia evidence.",
        "Secure encrypted messaging channel between informants and vetted authorities.",
        "Optimized for low-bandwidth mobile connections in emergency situations."
      ],
      tags: ["React.js", "Node.js", "Web Crypto API", "Express.js", "MongoDB", "PWA"],
      metrics: "Confidential encrypted civic reporting",
      accentColor: "#ef4444"
    },
    {
      id: "campuscare",
      title: "CampusCare Resolution Platform",
      tagline: "Real-time University Grievance & Facility Maintenance System",
      category: "Web & LMS",
      description: "A centralized campus incident and facility ticketing platform enabling university students and faculty to log complaints, track escalation, and ensure accountability.",
      highlights: [
        "Real-time ticket dispatch and departmental SLA monitoring.",
        "Automated push and SMS status notifications for complaint updates.",
        "Interactive administrative dashboard with resolution velocity heatmaps.",
        "Integrated feedback rating loop ensuring departmental accountability."
      ],
      tags: ["React.js", "Node.js", "REST APIs", "MySQL", "Socket.io", "Tailwind CSS"],
      metrics: "Enhanced campus dispute resolution times",
      accentColor: "#06b6d4"
    }
  ] as ProjectItem[],

  education: [
    {
      degree: "B.Sc. in Computer Science",
      institution: "Wellspring University",
      period: "Sept 2017 – Jan 2021",
      location: "Benin City, Nigeria",
      details: "Comprehensive study of core computer science, data structures, algorithms, network architecture, and software engineering methodologies."
    },
    {
      degree: "Professional Diploma in Web Development",
      institution: "NIIT (National Institute of Information Technology)",
      period: "Certified",
      location: "Nigeria",
      details: "Rigorous full stack web application development training, database management, and industry best practices."
    },
    {
      degree: "Advanced JavaScript & React.js Specialization",
      institution: "Edo Innovates",
      period: "Specialized",
      location: "Benin City, Nigeria",
      details: "Advanced asynchronous programming, functional patterns, state management architectures, and component lifecycle optimization."
    },
    {
      degree: "Digital Literacy & Technical Trainer Certification",
      institution: "Tech4Dev",
      period: "Certified",
      location: "Nigeria",
      details: "Pedagogical methodologies for technical training, digital empowerment, and developer coaching."
    }
  ],

  leadership: [
    {
      title: "Vice President",
      organization: "Educational Development Group (EDG)",
      year: "Active",
      description: "Leading youth educational empowerment initiatives, coordinating strategic community learning drives, and mentoring emerging technical talent."
    },
    {
      title: "Deputy Chief Liaison Officer",
      organization: "Nigerian Air Force (NYSC)",
      year: "2022",
      description: "Managed cross-departmental coordination, personnel communications, and logistics liaison between corps members and military authorities."
    },
    {
      title: "Presiding Officer",
      organization: "INEC Nigeria, 2023 General Elections",
      year: "2023",
      description: "Administered democratic voting procedures, biometric voter verification (BVAS), and official ballot integrity during the presidential & general elections."
    }
  ] as LeadershipItem[]
}
