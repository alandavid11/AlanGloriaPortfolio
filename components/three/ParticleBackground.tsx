import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTabVisible } from '../../utils/use3DCapability';
import { useWindowPointer } from '../../utils/useWindowPointer';

const COUNT = 120;

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const tabVisible = useTabVisible();
  const mouse = useRef({ x: 0, y: 0 });
  useWindowPointer();

  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const originalPositions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 4 - 2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }
    return { positions, originalPositions };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !tabVisible) return;
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x * 3, 0.03);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y * 2, 0.03);

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];
      const dx = ox - mouse.current.x;
      const dy = oy - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repel = Math.max(0, 1.2 - dist) * 0.35;

      pos[i * 3] = ox + (dx / (dist || 1)) * repel + Math.sin(t * 0.3 + i) * 0.02;
      pos[i * 3 + 1] = oy + (dy / (dist || 1)) * repel + Math.cos(t * 0.25 + i * 0.5) * 0.02;
      pos[i * 3 + 2] = oz + Math.sin(t * 0.2 + i * 0.3) * 0.05;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#38bdf8"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MeshGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const tabVisible = useTabVisible();

  useFrame((state) => {
    if (!meshRef.current || !tabVisible) return;
    meshRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.02;
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -3]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

export const ParticleBackgroundScene: React.FC = () => (
  <>
    <ambientLight intensity={0.2} />
    <Particles />
    <MeshGrid />
  </>
);

export const ParticleBackgroundFallback: React.FC = () => null;
