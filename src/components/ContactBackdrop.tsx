"use client";

import dynamic from "next/dynamic";
import { useTheme } from "./ThemeProvider";
import Canvas3DGate from "./three/Canvas3DGate";

const ContactScene = dynamic(() => import("./three/ContactScene"), {
  ssr: false,
  loading: () => null,
});

export default function ContactBackdrop() {
  const { theme } = useTheme();

  return (
    <Canvas3DGate
      className="pointer-events-none absolute inset-0 z-0"
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-accent-gradient h-72 w-72 rounded-full opacity-20 blur-3xl" />
        </div>
      }
    >
      {(onScreen) => <ContactScene theme={theme} active={onScreen} />}
    </Canvas3DGate>
  );
}
