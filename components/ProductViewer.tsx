"use client";

import { useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { HoseModel } from "./HoseModel";
import { HoseSvg } from "./HoseSvg";

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

function shouldReduceMotion() {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData =
    "connection" in navigator &&
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection?.saveData;
  return motion || Boolean(saveData);
}

type ViewerMode = "svg" | "3d-static" | "3d-animate";

function getClientMode(): ViewerMode {
  if (!canUseWebGL()) return "svg";
  if (shouldReduceMotion()) return "3d-static";
  return "3d-animate";
}

function subscribe() {
  return () => {};
}

export function ProductViewer({ background = "#788086" }: { background?: string }) {
  const mode = useSyncExternalStore(subscribe, getClientMode, () => "svg");

  if (mode === "svg") {
    return (
      <div className="mx-auto flex h-[min(58vw,460px)] w-full max-w-[720px] items-center justify-center">
        <HoseSvg className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto h-[min(58vw,460px)] w-full max-w-[720px]">
      <Canvas
        camera={{ position: [0, 0.9, 4.4], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.setClearColor(background, 1);
        }}
        fallback={<HoseSvg className="h-full w-full" />}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 3]} intensity={1.35} color="#fff6e8" />
        <directionalLight position={[-3, 1, -2]} intensity={0.35} color="#d58922" />
        <HoseModel animate={mode === "3d-animate"} />
      </Canvas>
    </div>
  );
}
