import React, { useRef, useState, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTabVisible } from '../../utils/use3DCapability';

export interface ConstellationSkill {
  name: string;
  group: string;
  color: string;
}

interface SkillsConstellationProps {
  skills: ConstellationSkill[];
}

function SkillNode({
  position,
  skill,
  isHovered,
  onHover,
}: {
  position: [number, number, number];
  skill: ConstellationSkill;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tabVisible = useTabVisible();

  useFrame((state) => {
    if (!meshRef.current || !tabVisible) return;
    const scale = isHovered ? 1.4 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.03;
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(skill.name);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={isHovered ? 1.2 : 0.4}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      {isHovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <span className="tag-pill text-[10px] whitespace-nowrap bg-zinc-900/90 border-sky-500/30 text-sky-300">
            {skill.name}
          </span>
        </Html>
      )}
    </group>
  );
}

function ConnectionLines({
  positions,
  hoveredIndex,
}: {
  positions: THREE.Vector3[];
  hoveredIndex: number | null;
}) {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < 1.8) {
          points.push(positions[i], positions[j]);
        }
      }
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    mat.opacity = hoveredIndex !== null ? 0.35 : 0.12;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.12} />
    </lineSegments>
  );
}

export const SkillsConstellationScene: React.FC<SkillsConstellationProps> = ({ skills }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);
  const tabVisible = useTabVisible();

  const positions = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    return skills.map((_, i) => {
      const y = 1 - (i / (skills.length - 1 || 1)) * 2;
      const radius = Math.sqrt(1 - y * y) * 1.6;
      const theta = golden * i;
      return new THREE.Vector3(Math.cos(theta) * radius, y * 1.2, Math.sin(theta) * radius);
    });
  }, [skills]);

  const hoveredIndex = hovered ? skills.findIndex((s) => s.name === hovered) : null;

  useFrame((_, delta) => {
    if (!groupRef.current || !tabVisible) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  const handleHover = useCallback((name: string | null) => setHovered(name), []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 3]} intensity={0.8} color="#38bdf8" />
      <ConnectionLines positions={positions} hoveredIndex={hoveredIndex} />
      {skills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          position={[positions[i].x, positions[i].y, positions[i].z]}
          skill={skill}
          isHovered={hovered === skill.name}
          onHover={handleHover}
        />
      ))}
    </group>
  );
};

export const SkillsConstellationFallback: React.FC = () => null;
