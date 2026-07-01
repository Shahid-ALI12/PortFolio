import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ---- Particle shell around the blob ---- */
function Particles({ color, count = 700 }) {
  const ref = useRef(null)
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.3 + Math.random() * 1.9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  useEffect(() => () => geo.dispose(), [geo])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ---- The rig: distorted gem + wireframe cage + particles, pointer parallax ---- */
function Rig({ colors }) {
  const group = useRef(null)
  const solidMat = useRef(null)
  const wireMat = useRef(null)
  const pointsColor = useMemo(() => new THREE.Color(colors[2]), [])
  const invalidate = useThree((s) => s.invalidate)

  // Recolor every material when the theme palette changes.
  useEffect(() => {
    const [a, b, c] = colors
    if (solidMat.current) {
      solidMat.current.color.set(b)
      solidMat.current.emissive.set(b)
    }
    if (wireMat.current) wireMat.current.color.set(a)
    pointsColor.set(c)
    invalidate()
  }, [colors, invalidate, pointsColor])

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05)
    const g = group.current
    if (!g) return
    // ease toward pointer for a parallax tilt + slow idle spin
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.4 + state.clock.elapsedTime * 0.04, 3, d)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.3, 3, d)
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={40} color={colors[0]} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={colors[1]} />

      <Icosahedron args={[1.25, 32]}>
        <MeshDistortMaterial
          ref={solidMat}
          color={colors[1]}
          emissive={colors[1]}
          emissiveIntensity={0.35}
          distort={0.4}
          speed={2.2}
          roughness={0.15}
          metalness={0.7}
        />
      </Icosahedron>

      <mesh scale={1.55}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial ref={wireMat} color={colors[0]} wireframe transparent opacity={0.35} />
      </mesh>

      <Particles color={pointsColor} />
    </group>
  )
}

export default function Scene3D({ colors, active = true, className }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 4.4], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
      style={{ background: 'transparent' }}
    >
      <Rig colors={colors} />
    </Canvas>
  )
}
