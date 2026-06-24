"use client";

import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";
import Canvas3DGate from "./three/Canvas3DGate";

// WebGL can only run client-side — load the scene with SSR disabled.
const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero3D() {
  const { theme, design } = useTheme();

  return (
    <Canvas3DGate
      className="absolute inset-0"
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-accent-gradient h-64 w-64 rounded-full opacity-30 blur-3xl" />
        </div>
      }
    >
      {(onScreen) => <Scene3D theme={theme} design={design} active={onScreen} />}
    </Canvas3DGate>
  );
}
