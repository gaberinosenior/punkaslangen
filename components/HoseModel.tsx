"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  Group,
  Quaternion,
  TubeGeometry,
  Vector3,
} from "three";

function makeCoil(turns: number, radius: number, height: number) {
  const points: Vector3[] = [];
  const steps = 220;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    points.push(
      new Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * height,
        Math.sin(angle) * radius,
      ),
    );
  }
  return new CatmullRomCurve3(points);
}

export function HoseModel({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  const coil = useMemo(() => makeCoil(5.15, 1.15, 1.55), []);
  const geometry = useMemo(
    () => new TubeGeometry(coil, 220, 0.09, 12, false),
    [coil],
  );

  const start = coil.getPoint(0);
  const end = coil.getPoint(1);
  const startTangent = coil.getTangent(0);
  const endTangent = coil.getTangent(1);

  useFrame((_, delta) => {
    if (animate && group.current) {
      group.current.rotation.y += delta * 0.32;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0.4, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#006eff"
          transparent
          opacity={0.55}
          roughness={0.85}
          metalness={0}
        />
      </mesh>
      <Valve position={start} tangent={startTangent} />
      <Valve position={end} tangent={endTangent} />
    </group>
  );
}

function Valve({
  position,
  tangent,
}: {
  position: Vector3;
  tangent: Vector3;
}) {
  const quaternion = useMemo(() => {
    const q = new Quaternion();
    q.setFromUnitVectors(new Vector3(0, 1, 0), tangent.clone().normalize());
    return q;
  }, [tangent]);

  return (
    <group position={position} quaternion={quaternion}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.28, 12]} />
        <meshStandardMaterial color="#000000" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.16, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}
