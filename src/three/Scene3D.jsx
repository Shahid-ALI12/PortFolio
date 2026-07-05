import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { TorusKnot, Octahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ---- Spiral particle galaxy ---- */
function ParticleGalaxy({ color, count = 1000 }) {
  const ref = useRef(null)
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colorObj = new THREE.Color(color)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 6
      const radius = 1.0 + Math.random() * 4.5
      const height = (Math.random() - 0.5) * 2.5
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  useEffect(() => () => geo.dispose(), [geo])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.028}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ---- Orbiting geometric shapes ---- */
function Orbiters({ color, count = 5 }) {
  const groupRef = useRef(null)
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const t = state.clock.elapsedTime
      const angle = t * (0.35 + i * 0.15) + (i * Math.PI * 2) / count
      const r = 2.6 + Math.sin(t * 0.7 + i) * 0.4
      child.position.x = Math.cos(angle) * r
      child.position.z = Math.sin(angle) * r
      child.position.y = Math.cos(angle * 2.5) * 0.7
      child.rotation.x += 0.015
      child.rotation.y += 0.025
    })
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <Octahedron key={i} args={[0.14, 0]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.95}
          />
        </Octahedron>
      ))}
    </group>
  )
}

/* ---- Main rig: Torus Knot + orbiters + particles ---- */
function Rig({ colors }) {
  const group = useRef(null)
  const knotMat = useRef(null)
  const wireMat = useRef(null)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const [a, b] = colors
    if (knotMat.current) {
      knotMat.current.color.set(b)
      knotMat.current.emissive.set(b)
    }
    if (wireMat.current) wireMat.current.color.set(a)
    invalidate()
  }, [colors, invalidate])

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05)
    const g = group.current
    if (!g) return
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      state.pointer.x * 0.5 + state.clock.elapsedTime * 0.025,
      2.5,
      d,
    )
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.35, 2.5, d)
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.18
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 3, 5]} intensity={45} color={colors[0]} />
      <pointLight position={[-4, -3, 3]} intensity={30} color={colors[1]} />
      <pointLight position={[0, -5, 0]} intensity={18} color={colors[2]} />

      {/* Central Torus Knot — unique, complex, nothing like a boring ball */}
      <TorusKnot args={[0.9, 0.25, 180, 24, 2, 3]}>
        <MeshDistortMaterial
          ref={knotMat}
          color={colors[1]}
          emissive={colors[1]}
          emissiveIntensity={0.45}
          distort={0.25}
          speed={1.8}
          roughness={0.1}
          metalness={0.85}
        />
      </TorusKnot>

      {/* Outer wireframe torus ring */}
      <mesh>
        <torusGeometry args={[1.85, 0.03, 16, 100]} />
        <meshBasicMaterial
          ref={wireMat}
          color={colors[0]}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Second ring at different angle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.025, 16, 100]} />
        <meshBasicMaterial color={colors[0]} transparent opacity={0.25} />
      </mesh>

      {/* Orbiting octahedrons */}
      <Orbiters color={colors[1]} count={5} />

      {/* Galaxy particles */}
      <ParticleGalaxy color={colors[0]} />
    </group>
  )
}

export default function Scene3D({ colors, active = true, className }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
      style={{ background: 'transparent' }}
    >
      <Rig colors={colors} />
    </Canvas>
  )
}
