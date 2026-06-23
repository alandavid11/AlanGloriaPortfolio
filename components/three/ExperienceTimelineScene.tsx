import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTabVisible } from '../../utils/use3DCapability';
import { ExperienceItem } from '../../types';

interface ExperienceTimeline3DProps {
  items: ExperienceItem[];
  progress: number;
}

function TimelineNode({
  position,
  item,
  isActive,
  index,
}: {
  position: [number, number, number];
  item: ExperienceItem;
  isActive: boolean;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const tabVisible = useTabVisible();

  useFrame((state) => {
    if (!meshRef.current || !tabVisible) return;
    const targetScale = isActive ? 1.3 : 0.8;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    if (isActive) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.04;
    }
  });

  const colors = ['#38bdf8', '#fb7185', '#34d399', '#a78bfa'];

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color={colors[index % colors.length]}
          emissive={colors[index % colors.length]}
          emissiveIntensity={isActive ? 1 : 0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      {isActive && (
        <Html center distanceFactor={10} position={[0.35, 0, 0]} style={{ pointerEvents: 'none' }}>
          <div className="text-left whitespace-nowrap">
            <p className="font-mono text-[9px] text-sky-400 uppercase tracking-wider">{item.period}</p>
            <p className="text-xs font-semibold text-zinc-100">{item.company}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function TimelinePath({ points, progress }: { points: THREE.Vector3[]; progress: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const fullPoints = useMemo(() => curve.getPoints(64), [curve]);
  const visibleCount = Math.max(2, Math.floor(progress * fullPoints.length));

  const visibleGeometry = useMemo(() => {
    const slice = fullPoints.slice(0, visibleCount);
    return new THREE.BufferGeometry().setFromPoints(slice);
  }, [fullPoints, visibleCount]);

  const fullGeometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(fullPoints),
    [fullPoints]
  );

  return (
    <>
      <line geometry={fullGeometry}>
        <lineBasicMaterial color="#52525b" transparent opacity={0.2} />
      </line>
      <line geometry={visibleGeometry}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.7} />
      </line>
    </>
  );
}

export const ExperienceTimeline3DScene: React.FC<ExperienceTimeline3DProps> = ({ items, progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const tabVisible = useTabVisible();

  const positions = useMemo(() => {
    return items.map((_, i) => {
      const t = i / Math.max(items.length - 1, 1);
      return new THREE.Vector3(-2 + t * 4, Math.sin(t * Math.PI) * 0.5, -t * 0.5);
    });
  }, [items]);

  const activeIndex = Math.min(items.length - 1, Math.floor(progress * items.length));

  useFrame(() => {
    if (!groupRef.current || !tabVisible) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      (progress - 0.5) * 0.3,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 3, 4]} intensity={0.8} color="#38bdf8" />
      <TimelinePath points={positions} progress={progress} />
      {items.map((item, i) => (
        <TimelineNode
          key={item.company}
          position={[positions[i].x, positions[i].y, positions[i].z]}
          item={item}
          isActive={i === activeIndex}
          index={i}
        />
      ))}
    </group>
  );
};

export const ExperienceTimelineFallback: React.FC = () => null;
