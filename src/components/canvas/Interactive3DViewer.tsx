import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { sound } from '../../utils/audio'
import { Rotate3d, Layers } from 'lucide-react'

export const Interactive3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [currentShape, setCurrentShape] = useState<'knot' | 'ico' | 'dodec' | 'sphere'>('knot')
  const [wireframe, setWireframe] = useState<boolean>(true)
  const [glowColor, setGlowColor] = useState<string>('#38bdf8')
  const [isInteracting, setIsInteracting] = useState<boolean>(false)

  const sceneRef = useRef<THREE.Scene | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const innerMeshRef = useRef<THREE.Mesh | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const rotVelocity = useRef<{ x: number; y: number }>({ x: 0.005, y: 0.008 })
  const isDragging = useRef<boolean>(false)
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 7.5

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)

    const keyLight = new THREE.PointLight(new THREE.Color(glowColor), 5, 20)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x818cf8, 3, 20)
    fillLight.position.set(-5, -3, 3)
    scene.add(fillLight)

    // Create Mesh Group
    const group = new THREE.Group()
    scene.add(group)

    // Function to generate geometry
    const getGeometry = (shape: string) => {
      switch (shape) {
        case 'ico':
          return new THREE.IcosahedronGeometry(2.3, 1)
        case 'dodec':
          return new THREE.DodecahedronGeometry(2.2, 0)
        case 'sphere':
          return new THREE.SphereGeometry(2.1, 32, 32)
        case 'knot':
        default:
          return new THREE.TorusKnotGeometry(1.6, 0.5, 120, 16)
      }
    }

    const geo = getGeometry(currentShape)
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(glowColor),
      wireframe: wireframe,
      roughness: 0.2,
      metalness: 0.9,
      emissive: new THREE.Color(glowColor),
      emissiveIntensity: 0.4
    })
    const mesh = new THREE.Mesh(geo, mat)
    group.add(mesh)
    meshRef.current = mesh

    // Core inside
    const innerGeo = new THREE.OctahedronGeometry(1.0, 0)
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(glowColor),
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    group.add(innerMesh)
    innerMeshRef.current = innerMesh

    // Orbiting particle halo
    const pCount = 350
    const pPositions = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const radius = 3.2 + Math.random() * 0.8
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = Math.cbrt(Math.random()) * radius
      const sinPhi = Math.sin(phi)
      pPositions[i * 3] = r * sinPhi * Math.cos(theta)
      pPositions[i * 3 + 1] = r * sinPhi * Math.sin(theta)
      pPositions[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      color: new THREE.Color(glowColor),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    })
    const particles = new THREE.Points(pGeo, pMat)
    group.add(particles)
    particlesRef.current = particles

    // Mouse Drag Interaction handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      setIsInteracting(true)
      previousMousePosition.current = { x: e.clientX, y: e.clientY }
      sound.playClick()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = e.clientX - previousMousePosition.current.x
      const deltaY = e.clientY - previousMousePosition.current.y

      rotVelocity.current = {
        x: deltaY * 0.005,
        y: deltaX * 0.005
      }

      group.rotation.y += deltaX * 0.008
      group.rotation.x += deltaY * 0.008

      previousMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging.current = false
      setTimeout(() => setIsInteracting(false), 500)
    }

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true
        setIsInteracting(true)
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y

      group.rotation.y += deltaX * 0.008
      group.rotation.x += deltaY * 0.008

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const onTouchEnd = () => {
      isDragging.current = false
      setTimeout(() => setIsInteracting(false), 500)
    }

    // Scroll wheel zoom interaction
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      camera.position.z = Math.max(4.5, Math.min(12, camera.position.z + e.deltaY * 0.005))
    }

    const dom = renderer.domElement
    dom.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    dom.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    dom.addEventListener('wheel', onWheel, { passive: false })

    // Resize
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Render loop
    let reqId: number
    const clock = new THREE.Clock()

    const animate = () => {
      reqId = requestAnimationFrame(animate)

      if (!isDragging.current) {
        // Apply inertia dampening
        rotVelocity.current.x *= 0.95
        rotVelocity.current.y *= 0.95

        group.rotation.x += rotVelocity.current.x + 0.004
        group.rotation.y += rotVelocity.current.y + 0.007
      }

      // Counter-rotate inner core
      innerMesh.rotation.y -= 0.015
      innerMesh.rotation.z += 0.01

      // Rotate particle halo
      particles.rotation.y += 0.005
      particles.rotation.x -= 0.003

      // Subtle float pulse
      const time = clock.getElapsedTime()
      group.position.y = Math.sin(time * 1.5) * 0.15

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(reqId)
      dom.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      dom.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      dom.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      pGeo.dispose()
      pMat.dispose()
    }
  }, [currentShape, wireframe, glowColor])

  const colors = [
    { label: 'Cyan', hex: '#38bdf8' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Violet', hex: '#a855f7' },
    { label: 'Amber', hex: '#f59e0b' }
  ]

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-3xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-slate-900/60 via-slate-950/70 to-slate-900/60 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 group">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the 3D model, scroll to zoom"
      />

      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs text-cyan-400 font-mono tracking-wider">
          <Rotate3d className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>3D INTERACTIVE LAB</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        <div className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700/50 hidden sm:block">
          {isInteracting ? 'ACTIVE DRAG VELOCITY' : 'DRAG TO ROTATE • SCROLL TO ZOOM'}
        </div>
      </div>

      {/* Bottom Interactive Control Panel */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800">
        {/* Geometry Shape Selector */}
        <div className="flex items-center space-x-1">
          {(['knot', 'ico', 'dodec', 'sphere'] as const).map((shape) => (
            <button
              key={shape}
              onClick={() => {
                setCurrentShape(shape)
                sound.playClick()
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-200 capitalize ${
                currentShape === shape
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {shape}
            </button>
          ))}
        </div>

        {/* Wireframe / Solid toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setWireframe(!wireframe)
              sound.playClick()
            }}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              wireframe
                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                : 'border-slate-700 bg-slate-800 text-slate-300'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>{wireframe ? 'Wireframe' : 'Solid Glass'}</span>
          </button>

          {/* Color Switcher */}
          <div className="flex items-center space-x-1.5 pl-1 border-l border-slate-800">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  setGlowColor(c.hex)
                  sound.playClick()
                }}
                className={`w-5 h-5 rounded-full transition-transform hover:scale-125 ${
                  glowColor === c.hex ? 'ring-2 ring-white scale-110' : 'opacity-70'
                }`}
                style={{ backgroundColor: c.hex }}
                title={`Switch to ${c.label}`}
                aria-label={`Switch to ${c.label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
