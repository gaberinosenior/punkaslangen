"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CanvasTexture,
  CatmullRomCurve3,
  Group,
  Quaternion,
  RepeatWrapping,
  TubeGeometry,
  Vector3,
} from "three";

function makeCoil(turns: number, radius: number, height: number) {
  const points: Vector3[] = [];
  const steps = 280;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const wobble = 0.04 * Math.sin(t * turns * Math.PI * 2);
    points.push(
      new Vector3(
        Math.cos(angle) * (radius + wobble),
        (t - 0.5) * height,
        Math.sin(angle) * (radius + wobble),
      ),
    );
  }
  return new CatmullRomCurve3(points);
}

function braidTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(0, 0, 128, 32);
  ctx.strokeStyle = "#2e2e2e";
  ctx.lineWidth = 4;
  for (let i = -40; i < 180; i += 10) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 28, 32);
    ctx.stroke();
  }
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 1.5;
  for (let i = -36; i < 180; i += 10) {
    ctx.beginPath();
    ctx.moveTo(i + 5, 0);
    ctx.lineTo(i + 33, 32);
    ctx.stroke();
  }
  const tex = new CanvasTexture(canvas);
  tex.wrapS = RepeatWrapping;
  tex.wrapT = RepeatWrapping;
  tex.repeat.set(28, 1);
  tex.anisotropy = 8;
  return tex;
}

export function HoseModel({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const coil = useMemo(() => makeCoil(4.2, 1.35, 0.55), []);
  const geometry = useMemo(
    () => new TubeGeometry(coil, 280, 0.095, 16, false),
    [coil],
  );
  const texture = useMemo(() => braidTexture(), []);

  const start = coil.getPoint(0);
  const end = coil.getPoint(1);
  const startTangent = coil.getTangent(0);
  const endTangent = coil.getTangent(1);

  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group ref={group} rotation={[0.55, 0.35, 0.08]}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial
          map={texture ?? undefined}
          color={texture ? "#ffffff" : "#1a1a1a"}
          roughness={0.55}
          metalness={0.12}
        />
      </mesh>
      <BrassNipple position={start} tangent={startTangent} />
      <AirChuck position={end} tangent={endTangent} />
    </group>
  );
}

function Fitting({
  position,
  tangent,
  children,
}: {
  position: Vector3;
  tangent: Vector3;
  children: ReactNode;
}) {
  const quaternion = useMemo(() => {
    const q = new Quaternion();
    q.setFromUnitVectors(new Vector3(0, 1, 0), tangent.clone().normalize());
    return q;
  }, [tangent]);

  return (
    <group position={position} quaternion={quaternion}>
      {children}
    </group>
  );
}

function BrassNipple({
  position,
  tangent,
}: {
  position: Vector3;
  tangent: Vector3;
}) {
  return (
    <Fitting position={position} tangent={tangent}>
      <mesh>
        <cylinderGeometry args={[0.11, 0.12, 0.16, 16]} />
        <meshStandardMaterial color="#8a8a8a" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.085, 0.09, 0.22, 16]} />
        <meshStandardMaterial color="#c9a227" metalness={0.9} roughness={0.28} />
      </mesh>
      {[0.08, 0.12, 0.16].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <torusGeometry args={[0.09, 0.008, 8, 20]} />
          <meshStandardMaterial color="#a9841c" metalness={0.9} roughness={0.3} />
        </mesh>
      ))}
    </Fitting>
  );
}

function AirChuck({
  position,
  tangent,
}: {
  position: Vector3;
  tangent: Vector3;
}) {
  return (
    <Fitting position={position} tangent={tangent}>
      <mesh>
        <cylinderGeometry args={[0.11, 0.12, 0.16, 16]} />
        <meshStandardMaterial color="#8a8a8a" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.26, 16]} />
        <meshStandardMaterial color="#c5c8cc" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0.08, 0.22, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.16, 0.035, 0.06]} />
        <meshStandardMaterial color="#9aa0a6" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.045, 0.04, 0.1, 12]} />
        <meshStandardMaterial color="#d0d3d6" metalness={0.9} roughness={0.2} />
      </mesh>
    </Fitting>
  );
}
