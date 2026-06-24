"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ThemeId } from "@/lib/themes";
import type { DesignId } from "@/lib/designs";

// Har design ka apna 3D "personality" — shape + kitni tezi se ghoome.
type ShapeKind = "ico" | "box" | "torusKnot" | "octa";
const DESIGN_3D: Record<DesignId, { shape: ShapeKind; speed: number; wire: number }> = {
  glass: { shape: "ico", speed: 1, wire: 1.55 },
  bento: { shape: "box", speed: 0.7, wire: 1.4 },
  cyber: { shape: "torusKnot", speed: 1.8, wire: 1.7 },
  threed: { shape: "octa", speed: 1.2, wire: 1.8 },
};

function ShapeGeometry({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case "box":
      return <boxGeometry args={[1.7, 1.7, 1.7]} />;
    case "torusKnot":
      return <torusKnotGeometry args={[0.9, 0.3, 128, 16]} />;
    case "octa":
      return <octahedronGeometry args={[1.4, 0]} />;
    case "ico":
    default:
      return <icosahedronGeometry args={[1.25, 1]} />;
  }
}

function readAccents(): [string, string] {
  if (typeof window === "undefined") return ["#22d3ee", "#a78bfa"];
  const s = getComputedStyle(document.documentElement);
  const a = s.getPropertyValue("--accent").trim() || "#22d3ee";
  const b = s.getPropertyValue("--accent-2").trim() || "#a78bfa";
  return [a, b];
}

function Rig({ theme, design }: { theme: ThemeId; design: DesignId }) {
  const cfg = DESIGN_3D[design] ?? DESIGN_3D.glass;
  const group = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const solidMat = useRef<THREE.MeshStandardMaterial>(null);
  const wireMat = useRef<THREE.MeshBasicMaterial>(null);
  const lightA = useRef<THREE.PointLight>(null);
  const lightB = useRef<THREE.PointLight>(null);
  const target = useRef({ x: 0, y: 0 });
  const invalidate = useThree((s) => s.invalidate);

  // Particle field built once, recolored on theme change.
  const points = useMemo(() => {
    const count = 450;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }, []);

  // Apply theme accent colors to every material.
  useEffect(() => {
    const [a, b] = readAccents();
    const colA = new THREE.Color(a);
    const colB = new THREE.Color(b);
    solidMat.current?.color.set(colA);
    solidMat.current?.emissive.set(colA);
    wireMat.current?.color.set(colB);
    (points.material as THREE.PointsMaterial).color.set(colB);
    lightA.current?.color.set(colA);
    lightB.current?.color.set(colB);
    invalidate(); // repaint even if the loop is paused (off-screen)
  }, [theme, points, invalidate]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    return () => {
      points.geometry.dispose();
      (points.material as THREE.Material).dispose();
    };
  }, [points]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.05);
    const sp = cfg.speed;
    if (solid.current) {
      solid.current.rotation.y += d * 0.25 * sp;
      solid.current.rotation.x += d * 0.15 * sp;
    }
    if (wire.current) {
      wire.current.rotation.y -= d * 0.18 * sp;
      wire.current.rotation.z += d * 0.1 * sp;
    }
    points.rotation.y += d * 0.04;
    if (group.current) {
      // ease the whole rig toward the pointer for a parallax tilt
      group.current.rotation.y +=
        (target.current.x * 0.5 - group.current.rotation.y) * 0.04;
      group.current.rotation.x +=
        (-target.current.y * 0.35 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={1.1} />
      <pointLight ref={lightA} position={[4, 4, 4]} intensity={60} distance={20} />
      <pointLight ref={lightB} position={[-4, -2, 3]} intensity={45} distance={20} />

      <mesh ref={solid}>
        <ShapeGeometry kind={cfg.shape} />
        <meshStandardMaterial
          ref={solidMat}
          roughness={0.25}
          metalness={0.5}
          emissiveIntensity={0.35}
          flatShading
        />
      </mesh>

      <mesh ref={wire} scale={cfg.wire}>
        <ShapeGeometry kind={cfg.shape} />
        <meshBasicMaterial ref={wireMat} wireframe transparent opacity={0.4} />
      </mesh>

      <primitive object={points} />
    </group>
  );
}

export default function Scene3D({
  theme,
  design,
  active = true,
}: {
  theme: ThemeId;
  design: DesignId;
  active?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
      style={{ background: "transparent" }}
    >
      <Rig theme={theme} design={design} />
    </Canvas>
  );
}
