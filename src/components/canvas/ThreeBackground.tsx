import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  themeColor?: string
  particleCount?: number
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  themeColor = '#38bdf8'
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.fog = new THREE.FogExp2(0x030712, 0.018)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 24
    camera.position.y = 0

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(themeColor, 4, 60)
    pointLight.position.set(0, 5, 10)
    scene.add(pointLight)

    const mouseLight = new THREE.PointLight(0x06b6d4, 3, 40)
    mouseLight.position.set(0, 0, 8)
    scene.add(mouseLight)

    // Central Cyber Core Mesh Group
    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    // 1. Inner Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(3.2, 1)
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8
    })
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial)
    coreGroup.add(icoMesh)

    // 2. Solid Inner Polyhedron with glass-like appearance
    const innerCoreGeo = new THREE.OctahedronGeometry(1.8, 0)
    const innerCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.7,
      ior: 1.5
    })
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat)
    coreGroup.add(innerCore)

    // 3. Orbiting Cyber Rings
    const ring1Geo = new THREE.TorusGeometry(5.2, 0.04, 16, 100)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3
    coreGroup.add(ring1)

    const ring2Geo = new THREE.TorusGeometry(6.4, 0.03, 16, 100)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.5
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.y = Math.PI / 4
    coreGroup.add(ring2)

    const ring3Geo = new THREE.TorusGeometry(7.6, 0.02, 16, 100)
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.4
    })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.z = Math.PI / 6
    coreGroup.add(ring3)

    // 4. Interactive Particle Constellation System
    const particleCount = 2000
    const particlePositions = new Float32Array(particleCount * 3)
    const particleOriginalPositions = new Float32Array(particleCount * 3)
    const particleSpeeds = new Float32Array(particleCount)
    const particleColors = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color(0x38bdf8) // Cyan
    const color2 = new THREE.Color(0x818cf8) // Indigo
    const color3 = new THREE.Color(0x10b981) // Emerald
    const color4 = new THREE.Color(0xc084fc) // Purple

    for (let i = 0; i < particleCount; i++) {
      const radius = 8 + Math.random() * 45
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = (Math.random() - 0.5) * 60

      particlePositions[i * 3] = x
      particlePositions[i * 3 + 1] = y
      particlePositions[i * 3 + 2] = z

      particleOriginalPositions[i * 3] = x
      particleOriginalPositions[i * 3 + 1] = y
      particleOriginalPositions[i * 3 + 2] = z

      particleSpeeds[i] = 0.2 + Math.random() * 0.8

      // Palette distribution
      const rnd = Math.random()
      const selectedColor = rnd < 0.4 ? color1 : rnd < 0.7 ? color2 : rnd < 0.85 ? color3 : color4
      particleColors[i * 3] = selectedColor.r
      particleColors[i * 3 + 1] = selectedColor.g
      particleColors[i * 3 + 2] = selectedColor.b
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    // Create subtle circular texture for glowing particle points
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
      gradient.addColorStop(0, 'rgba(255,255,255,1)')
      gradient.addColorStop(0.3, 'rgba(56,189,248,0.8)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 32, 32)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // 5. Floating Cyber Polyhedrons distributed across the vertical space
    const floatingNodes: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number; z: number }; initialY: number }[] = []
    const geometries = [
      new THREE.TetrahedronGeometry(1.2),
      new THREE.OctahedronGeometry(1.4),
      new THREE.DodecahedronGeometry(1.5),
      new THREE.TorusGeometry(1.2, 0.25, 8, 24)
    ]

    for (let i = 0; i < 18; i++) {
      const geo = geometries[i % geometries.length]
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x0ea5e9 : 0x8b5cf6,
        wireframe: true,
        roughness: 0.3,
        metalness: 0.8
      })
      const mesh = new THREE.Mesh(geo, mat)
      const posX = (Math.random() - 0.5) * 40
      const posY = 15 - (i * 5) + (Math.random() - 0.5) * 4
      const posZ = -5 + (Math.random() - 0.5) * 15

      mesh.position.set(posX, posY, posZ)
      scene.add(mesh)
      floatingNodes.push({
        mesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        },
        initialY: posY
      })
    }

    // Cursor tracking state
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0
    let mouseVelocity = 0
    let lastMouseX = 0
    let lastMouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1

      const dx = targetMouseX - lastMouseX
      const dy = targetMouseY - lastMouseY
      mouseVelocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 5, 2)
      lastMouseX = targetMouseX
      lastMouseY = targetMouseY
    }

    // Scroll tracking state
    let targetScrollProgress = 0
    let currentScrollProgress = 0
    let scrollSpeed = 0
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      targetScrollProgress = window.scrollY / maxScroll
      const deltaScroll = Math.abs(window.scrollY - lastScrollY)
      scrollSpeed = Math.min(deltaScroll / 20, 3)
      lastScrollY = window.scrollY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse lerping
      currentMouseX += (targetMouseX - currentMouseX) * 0.06
      currentMouseY += (targetMouseY - currentMouseY) * 0.06
      mouseVelocity *= 0.95

      // Smooth scroll lerping
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08
      scrollSpeed *= 0.92

      // Position mouse light in 3D world coords
      mouseLight.position.x = currentMouseX * 16
      mouseLight.position.y = currentMouseY * 12 + camera.position.y
      mouseLight.position.z = 10 + Math.sin(elapsedTime * 2) * 2

      // Camera responds dynamically to scroll and cursor
      const scrollCameraY = -currentScrollProgress * 55
      camera.position.x = currentMouseX * 4
      camera.position.y = scrollCameraY + currentMouseY * 2
      camera.position.z = 24 + Math.sin(currentScrollProgress * Math.PI) * 5 - scrollSpeed * 1.5

      // Camera tilt towards mouse
      camera.rotation.y = -currentMouseX * 0.12
      camera.rotation.x = currentMouseY * 0.12

      // Core rotation with cursor velocity and scroll acceleration
      const speedMultiplier = 1 + mouseVelocity * 1.5 + scrollSpeed * 2
      coreGroup.rotation.y += 0.008 * speedMultiplier
      coreGroup.rotation.x += 0.004 * speedMultiplier
      coreGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.2

      // Position the central core according to scroll stage
      coreGroup.position.y = -currentScrollProgress * 30 + Math.sin(elapsedTime) * 0.5
      coreGroup.position.x = Math.sin(currentScrollProgress * Math.PI * 2) * 6

      // Animate rings
      ring1.rotation.z += 0.015 * speedMultiplier
      ring2.rotation.x += 0.012 * speedMultiplier
      ring3.rotation.y += 0.018 * speedMultiplier

      // Inner core pulse
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08 + mouseVelocity * 0.1
      innerCore.scale.set(pulse, pulse, pulse)

      // Particles interact with cursor and scroll
      const positions = particleGeometry.attributes.position.array as Float32Array
      const mouse3DX = currentMouseX * 20
      const mouse3DY = currentMouseY * 15 + camera.position.y

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const origX = particleOriginalPositions[i3]
        const origY = particleOriginalPositions[i3 + 1]

        // Orbit drift
        positions[i3] = origX + Math.sin(elapsedTime * 0.3 + i) * 1.2
        positions[i3 + 1] = origY + Math.cos(elapsedTime * 0.2 + i) * 1.2

        // Warp effect along Z when scrolling
        if (scrollSpeed > 0.1) {
          positions[i3 + 2] += (scrollSpeed * 0.8)
          if (positions[i3 + 2] > 30) {
            positions[i3 + 2] = -30
          }
        }

        // Mouse gravitational deflection
        const dx = positions[i3] - mouse3DX
        const dy = positions[i3 + 1] - mouse3DY
        const distSq = dx * dx + dy * dy
        if (distSq < 36) {
          const force = (1 - distSq / 36) * 1.2
          positions[i3] += dx * force * 0.1
          positions[i3 + 1] += dy * force * 0.1
        }
      }
      particleGeometry.attributes.position.needsUpdate = true

      // Animate floating secondary nodes
      floatingNodes.forEach((node, idx) => {
        node.mesh.rotation.x += node.rotSpeed.x * speedMultiplier
        node.mesh.rotation.y += node.rotSpeed.y * speedMultiplier
        node.mesh.rotation.z += node.rotSpeed.z * speedMultiplier

        // Gentle floating wave
        node.mesh.position.y = node.initialY + Math.sin(elapsedTime * 0.8 + idx) * 1.5

        // Hover scale if near mouse in XY projection
        const nodeDistToMouse = Math.hypot(
          node.mesh.position.x - mouse3DX,
          node.mesh.position.y - mouse3DY
        )
        const targetScale = nodeDistToMouse < 6 ? 1.4 : 1.0
        node.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      icoGeometry.dispose()
      icoMaterial.dispose()
      innerCoreGeo.dispose()
      innerCoreMat.dispose()
      ring1Geo.dispose()
      ring2Geo.dispose()
      ring3Geo.dispose()
      ring1Mat.dispose()
      ring2Mat.dispose()
      ring3Mat.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      particleTexture.dispose()
    }
  }, [themeColor])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  )
}
