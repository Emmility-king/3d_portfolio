// Web Audio API interactive sound synthesizer (No external audio file dependencies needed)

class SoundFX {
  private ctx: AudioContext | null = null
  public enabled: boolean = false

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggle(): boolean {
    this.init()
    this.enabled = !this.enabled
    if (this.enabled) {
      this.playPowerUp()
    }
    return this.enabled
  }

  public playHover() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = 'sine'
    osc.frequency.setValueAtTime(420, now)
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.04)

    gain.gain.setValueAtTime(0.015, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.04)
  }

  public playClick() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(600, now)
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.06)

    gain.gain.setValueAtTime(0.04, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.06)
  }

  public playPowerUp() {
    this.init()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = 'sine'
    osc.frequency.setValueAtTime(260, now)
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.15)

    gain.gain.setValueAtTime(0.03, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.16)
  }

  public playWarp() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(180, now)
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.2)

    gain.gain.setValueAtTime(0.02, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.22)
  }

  public playKeypress() {
    if (!this.enabled) return
    this.init()
    if (!this.ctx) return

    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    const now = this.ctx.currentTime

    osc.type = 'square'
    osc.frequency.setValueAtTime(320 + Math.random() * 80, now)

    gain.gain.setValueAtTime(0.015, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03)

    osc.connect(gain)
    gain.connect(this.ctx.destination)

    osc.start(now)
    osc.stop(now + 0.03)
  }
}

export const sound = new SoundFX()
