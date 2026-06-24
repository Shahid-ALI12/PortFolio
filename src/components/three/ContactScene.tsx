"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ThemeId } from "@/lib/themes";

function readAccents(): [string, string] {
  if (typeof window === "undefined") return ["#22d3ee", "#a78bfa"];
  const s = getComputedStyle(document.documentElement);
  const a = s.getPropertyValue("--accent").trim() || "#22d3ee";
  const b = s.getPropertyValue("--accent-2").trim() || "#a78bfa";
  return [a, b];
}

function Knot({ theme }: { theme: ThemeId }) {
  const group = useRef<THREE.Group>(null);
  const solidMat = useRef<THREE.MeshStandardMaterial>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const lightA = useRef<THREE.PointLight>(null);
  const lightB = useRef<THREE.PointLight>(null);
  const target = useRef({ x: 0, y: 0 });
  const invalidate = useThree((s) => s.invalidate);

  const geo = useMemo(
    () => new THREE.TorusKnotGeometry(1.1, 0.34, 180, 24, 2, 3),
    [],
  );
  useEffect(() => () => geo.dispose(), [geo]);

  useEffect(() => {
    const [a, b] = readAccents();
    const colA = new THREE.Color(a);
    const colB = new THREE.Color(b);
    const isLight = theme === "light";
    if (solidMat.current) {
      solidMat.current.color.set(colA);
      solidMat.current.emissive.set(colA);
      solidMat.current.emissiveIntensity = isLight ? 0.15 : 0.3;
    }
    if (wireMat.current) {
      wireMat.current.color.set(colB);
      wireMat.current.opacity = isLight ? 0.2 : 0.28;
    }
    lightA.current?.color.set(colA);
    lightB.current?.color.set(colB);
    invalidate(); // repaint even if the loop is paused (off-screen)
  }, [theme, invalidate]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const g = group.current;
    if (!g) return;
    g.rotation.z += d * 0.08;
    g.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.04);
    g.rotation.y += (target.current.x * 0.4 - g.rotation.y) * 0.04;
    g.rotation.x += (-target.current.y * 0.3 - g.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      <ambientLight intensity={1.1} />
      <pointLight ref={lightA} position={[4, 4, 4]} intensity={60} distance={20} />
      <pointLight ref={lightB} position={[-4, -2, 3]} intensity={45} distance={20} />

      <mesh geometry={geo}>
        <meshStandardMaterial
          ref={solidMat}
          roughness={0.3}
          metalness={0.45}
          emissiveIntensity={0.3}
          flatShading
        />
      </mesh>

      <mesh geometry={geo} scale={1.18}>
        <meshBasicMaterial ref={wireMat} wireframe transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

export default function ContactScene({
  theme,
  active = true,
}: {
  theme: ThemeId;
  active?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
      style={{ background: "transparent" }}
    >
      <Knot theme={theme} />
    </Canvas>
  );
}
