import React, { useState, useRef, useEffect } from 'react'
import { Terminal, Send, Minimize2, Maximize2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { sound } from '../../utils/audio'
import { PORTFOLIO_DATA } from '../../data/portfolioData'

interface CommandHistory {
  command: string
  output: React.ReactNode
  timestamp: string
}

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">
            ⚡ Welcome to Emmility OS v3.8.4 [Terminal Kernel 6.12]
          </p>
          <p className="text-xs text-slate-400">
            Interactive shell for Olafisoye-Oragbade Oluwatobi Emmanuel (Emmility).
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-emerald-400 font-mono">help</span> or click command shortcuts below.
          </p>
        </div>
      ),
      timestamp: '00:00:01'
    }
  ])
  const [isMinimized, setIsMinimized] = useState<boolean>(false)

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase()
    sound.playKeypress()

    const time = new Date().toLocaleTimeString('en-US', { hour12: false })

    if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    let outputNode: React.ReactNode

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-cyan-400 font-semibold">Available Terminal Commands:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono">
              <div><span className="text-emerald-400 font-bold">whoami</span> - Developer bio</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - Technical matrix</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - Shipped projects</div>
              <div><span className="text-emerald-400 font-bold">experience</span> - Career timeline</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Email & phone</div>
              <div><span className="text-emerald-400 font-bold">cat cv.txt</span> - Raw summary</div>
              <div><span className="text-emerald-400 font-bold">confetti</span> - Launch celebration</div>
              <div><span className="text-emerald-400 font-bold">hire</span> - Availability status</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Wipe console</div>
            </div>
          </div>
        )
        break

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-bold">{PORTFOLIO_DATA.personal.name} ({PORTFOLIO_DATA.personal.nickname})</p>
            <p className="text-slate-300">{PORTFOLIO_DATA.personal.title}</p>
            <p className="text-slate-400">📍 {PORTFOLIO_DATA.personal.location} | {PORTFOLIO_DATA.personal.yearsExperience} Years Experience</p>
            <p className="text-slate-400">{PORTFOLIO_DATA.personal.summary}</p>
          </div>
        )
        break

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-400 font-bold">Core Engineering Capabilities:</p>
            <div className="space-y-1">
              {PORTFOLIO_DATA.skills.map((c) => (
                <div key={c.title} className="flex flex-wrap gap-1 items-center">
                  <span className="text-slate-400 w-36 font-semibold">{c.title}:</span>
                  {c.skills.map((s) => (
                    <span key={s.name} className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                      {s.name}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
        break

      case 'projects':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-cyan-400 font-bold">Engineered Production Deployments:</p>
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-cyan-500/40 pl-2 py-0.5">
                <span className="text-emerald-400 font-bold">{p.title}</span>: {p.tagline}
                <div className="text-slate-500 font-mono text-[11px]">{p.tags.join(' • ')}</div>
              </div>
            ))}
          </div>
        )
        break

      case 'experience':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-400 font-bold">Work Experience Journey:</p>
            {PORTFOLIO_DATA.experience.map((exp) => (
              <div key={exp.id} className="bg-slate-900/60 p-2 rounded border border-slate-800">
                <div className="text-emerald-400 font-bold">{exp.role} @ {exp.company}</div>
                <div className="text-slate-500">{exp.period} | {exp.location}</div>
                <div className="text-slate-300 mt-1">{exp.description}</div>
              </div>
            ))}
          </div>
        )
        break

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-400 font-bold">Direct Channels to Emmanuel:</p>
            <p className="text-slate-300">📧 Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-cyan-300 underline">{PORTFOLIO_DATA.personal.email}</a></p>
            <p className="text-slate-300">📱 Phone: {PORTFOLIO_DATA.personal.phoneNumbers.join(', ')}</p>
            <p className="text-slate-300">🌐 Web: <a href={PORTFOLIO_DATA.personal.portfolioUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{PORTFOLIO_DATA.personal.portfolioUrl}</a></p>
            <p className="text-slate-300">🐙 GitHub: <a href={PORTFOLIO_DATA.personal.githubUrl} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{PORTFOLIO_DATA.personal.githubUrl}</a></p>
          </div>
        )
        break

      case 'cat cv.txt':
        outputNode = (
          <pre className="text-[11px] font-mono text-slate-300 bg-slate-950 p-2 rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap">
{`=============================================================
CV SUMMARY: ${PORTFOLIO_DATA.personal.name}
ROLE: ${PORTFOLIO_DATA.personal.title}
LOCATION: ${PORTFOLIO_DATA.personal.location}
CONTACT: ${PORTFOLIO_DATA.personal.email} | ${PORTFOLIO_DATA.personal.phoneNumbers[0]}
=============================================================
SUMMARY:
${PORTFOLIO_DATA.personal.summary}

TOP SKILLS:
React.js, Next.js, Node.js, TypeScript, PostgreSQL, MongoDB,
Docker, Python, REST APIs, Linux Servers, React Native, Flutter

EDUCATION:
B.Sc. Computer Science - Wellspring University (2017-2021)
=============================================================`}
          </pre>
        )
        break

      case 'confetti':
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        })
        outputNode = <p className="text-emerald-400 font-bold">🎉 Confetti dispatched successfully!</p>
        break

      case 'hire':
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        })
        outputNode = (
          <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
            <p className="font-bold">STATUS: READY TO BUILD WITH YOU</p>
            <p>Emmanuel is open for Full-Time, Remote, and Contract positions in Lagos and globally.</p>
            <p className="mt-1 text-slate-300">Reach out at <span className="text-cyan-300 font-mono font-bold">{PORTFOLIO_DATA.personal.email}</span></p>
          </div>
        )
        break

      case 'sudo':
        outputNode = <p className="text-rose-400 font-mono">User 'visitor' is not in the sudoers file. This incident will be reported to Emmanuel.</p>
        break

      default:
        outputNode = (
          <p className="text-rose-400 font-mono">
            Command not recognized: <span className="text-white font-bold">{trimmed}</span>. Type <span className="text-cyan-300 font-bold">help</span> for commands.
          </p>
        )
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmdStr,
        output: outputNode,
        timestamp: time
      }
    ])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    }
  }

  const quickCommands = ['help', 'whoami', 'skills', 'projects', 'hire', 'confetti']

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-950/90 shadow-2xl backdrop-blur-xl font-mono text-sm">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 pl-2 border-l border-slate-700">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-300 font-semibold">bash ~ emmility-devbox</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:text-white rounded hover:bg-slate-800 transition"
            title={isMinimized ? 'Expand terminal' : 'Minimize terminal'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Output log */}
          <div className="p-4 max-h-[300px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-bold">visitor@olafisoye:~$</span>
                  <span className="text-white font-semibold">{item.command}</span>
                  <span className="text-[10px] text-slate-600">[{item.timestamp}]</span>
                </div>
                <div className="pl-3">{item.output}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick command buttons */}
          <div className="px-4 py-1.5 bg-slate-900/40 border-t border-slate-900 flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] text-slate-500">Shortcuts:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2 py-0.5 rounded text-[11px] bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 transition"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Input prompt */}
          <div className="flex items-center px-4 py-2.5 bg-slate-900/80 border-t border-slate-800">
            <span className="text-cyan-400 font-bold text-xs mr-2">visitor@olafisoye:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'skills', 'projects', 'hire'..."
              className="flex-1 bg-transparent text-white text-xs outline-none placeholder:text-slate-600 font-mono"
              autoFocus={false}
            />
            <button
              onClick={() => executeCommand(input)}
              className="p-1 text-cyan-400 hover:text-cyan-300 rounded hover:bg-slate-800 transition"
              title="Run command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
