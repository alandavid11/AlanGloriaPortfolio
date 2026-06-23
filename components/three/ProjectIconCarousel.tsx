import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTabVisible } from '../../utils/use3DCapability';

export interface ProjectIcon {
  id: string;
  label: string;
  texture?: string;
  color?: string;
  letter?: string;
}

interface ProjectIconCarouselProps {
  projects: ProjectIcon[];
}

function IconSlot({
  position,
  rotation,
  project,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  project: ProjectIcon;
}) {
  const texture = useTexture(project.texture ?? '/word-icon.webp');

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[0.55, 0.55]} />
        {project.texture ? (
          <meshBasicMaterial map={texture} transparent toneMapped={false} />
        ) : (
          <meshStandardMaterial color={project.color ?? '#27272a'} metalness={0.3} roughness={0.5} />
        )}
      </mesh>
      {!project.texture && project.letter && (
        <Text position={[0, 0, 0.01]} fontSize={0.22} color="#fafafa" anchorX="center" anchorY="middle">
          {project.letter}
        </Text>
      )}
    </group>
  );
}

export const ProjectIconCarouselScene: React.FC<ProjectIconCarouselProps> = ({ projects }) => {
  const groupRef = useRef<THREE.Group>(null);
  const tabVisible = useTabVisible();
  const count = projects.length;
  const radius = 1.4;

  useFrame((_, delta) => {
    if (!groupRef.current || !tabVisible) return;
    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#38bdf8" />
      {projects.map((project, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const rotY = -angle;
        return (
          <IconSlot
            key={project.id}
            position={[x, 0, z]}
            rotation={[0, rotY, 0]}
            project={project}
          />
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

export const ProjectIconCarouselFallback: React.FC = () => (
  <div className="flex items-center justify-center gap-3">
    <img src="/word-icon.webp" alt="WoRD" className="w-10 h-10 rounded-xl border border-white/10" />
    <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">
      C
    </div>
    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-200 text-sm font-bold">
      C
    </div>
  </div>
);
