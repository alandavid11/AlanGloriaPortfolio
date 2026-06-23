import React, { forwardRef, useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useTabVisible } from '../../utils/use3DCapability';
import { useWindowPointer } from '../../utils/useWindowPointer';

type MockupKind = 'phone' | 'desktop';

const MOCKUPS: { src: string; kind: MockupKind; label: string }[] = [
  { src: '/word-01-home.webp', kind: 'phone', label: 'WoRD iOS app' },
  { src: '/codtr-01-home.webp', kind: 'desktop', label: 'CODTR web platform' },
  { src: '/cacho-posiciones.webp', kind: 'desktop', label: 'Cachoquiniela web app' },
];

const CYCLE_INTERVAL = 3.2;
const TRANSITION_DURATION = 0.55;

function setGroupOpacity(group: THREE.Group | null, opacity: number) {
  if (!group) return;

  group.visible = opacity > 0.01;
  group.scale.setScalar(THREE.MathUtils.lerp(0.94, 1, opacity));

  group.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      const baseOpacity = typeof material.userData.baseOpacity === 'number' ? material.userData.baseOpacity : material.opacity;
      material.userData.baseOpacity = baseOpacity;
      material.transparent = opacity < 0.99 || baseOpacity < 0.99 || material.transparent;
      material.opacity = baseOpacity * opacity;
    });
  });
}

interface MockupFrameProps {
  kind: MockupKind;
  texture: THREE.Texture;
}

const MockupFrame = forwardRef<THREE.Group, MockupFrameProps>(({ kind, texture }, ref) => {
  if (kind === 'desktop') {
    return <DesktopFrame ref={ref} texture={texture} />;
  }

  return <PhoneFrame ref={ref} texture={texture} />;
});

const PhoneFrame = forwardRef<THREE.Group, { texture: THREE.Texture }>(({ texture }, ref) => {
  const bodyW = 1.05;
  const bodyH = 2.15;
  const bodyD = 0.08;
  const screenW = 0.92;
  const screenH = 1.95;
  const islandY = screenH * 0.42 - 0.08;

  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[bodyW, bodyH, bodyD]} />
        <meshStandardMaterial color="#1c1c1e" metalness={0.85} roughness={0.25} />
      </mesh>

      <mesh position={[0, 0, bodyD / 2 - 0.002]}>
        <planeGeometry args={[screenW * 1.08, screenH * 1.06]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.12} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, bodyD / 2 + 0.001]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial map={texture} toneMapped={false} color="#ffffff" />
      </mesh>

      <mesh position={[0, 0, bodyD / 2 + 0.002]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, islandY, bodyD / 2 + 0.004]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.032, 0.1, 4, 12]} />
        <meshStandardMaterial color="#050505" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.045, islandY, bodyD / 2 + 0.005]}>
        <circleGeometry args={[0.012, 16]} />
        <meshStandardMaterial color="#0a0a0c" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0, -(bodyD / 2 + 0.001)]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial map={texture} toneMapped={false} color="#ffffff" />
      </mesh>

      <mesh position={[0, bodyH * 0.28, -(bodyD / 2 + 0.012)]}>
        <cylinderGeometry args={[0.11, 0.11, 0.018, 32]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh position={[0, bodyH * 0.28, -(bodyD / 2 + 0.022)]}>
        <circleGeometry args={[0.045, 24]} />
        <meshStandardMaterial color="#0d0d0f" metalness={0.9} roughness={0.15} />
      </mesh>

      <mesh position={[bodyW / 2 + 0.008, bodyH * 0.15, 0]}>
        <boxGeometry args={[0.012, 0.18, 0.04]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
});

const DesktopFrame = forwardRef<THREE.Group, { texture: THREE.Texture }>(({ texture }, ref) => {
  const bodyW = 2.35;
  const bodyH = 1.42;
  const bodyD = 0.06;
  const screenW = 2.12;
  const screenH = 1.2;
  const chromeH = 0.16;

  return (
    <group ref={ref}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[bodyW, bodyH, bodyD]} />
        <meshStandardMaterial color="#111827" metalness={0.72} roughness={0.28} />
      </mesh>

      <mesh position={[0, 0, bodyD / 2 - 0.002]}>
        <planeGeometry args={[bodyW * 1.04, bodyH * 1.08]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.1} toneMapped={false} />
      </mesh>

      <mesh position={[0, bodyH / 2 - chromeH / 2 - 0.06, bodyD / 2 + 0.002]}>
        <planeGeometry args={[screenW, chromeH]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.96} toneMapped={false} />
      </mesh>

      {[-0.93, -0.86, -0.79].map((x, i) => (
        <mesh key={x} position={[x, bodyH / 2 - chromeH / 2 - 0.06, bodyD / 2 + 0.006]}>
          <circleGeometry args={[0.018, 16]} />
          <meshBasicMaterial color={['#fb7185', '#fbbf24', '#34d399'][i]} toneMapped={false} />
        </mesh>
      ))}

      <mesh position={[0, -0.06, bodyD / 2 + 0.004]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial map={texture} toneMapped={false} color="#ffffff" />
      </mesh>

      <mesh position={[0, -0.06, bodyD / 2 + 0.005]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0, -(bodyD / 2 + 0.001)]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial map={texture} toneMapped={false} color="#ffffff" transparent opacity={0.5} />
      </mesh>

      <mesh position={[0, -bodyH / 2 - 0.08, 0.02]} rotation={[Math.PI / 2.6, 0, 0]}>
        <boxGeometry args={[1.65, 0.16, 0.035]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.22} />
      </mesh>
    </group>
  );
});

function PhoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const currentFrameRef = useRef<THREE.Group>(null);
  const previousFrameRef = useRef<THREE.Group>(null);
  const textures = useTexture(MOCKUPS.map((mockup) => mockup.src));
  const [screenIndex, setScreenIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const elapsedRef = useRef(0);
  const transitionRef = useRef(1);
  const { pointer } = useThree();
  const tabVisible = useTabVisible();
  useWindowPointer();

  useMemo(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
    });
  }, [textures]);

  useFrame((_, delta) => {
    if (!groupRef.current || !tabVisible) return;

    elapsedRef.current += delta;
    if (elapsedRef.current >= CYCLE_INTERVAL) {
      elapsedRef.current = 0;
      transitionRef.current = 0;
      setScreenIndex((i) => {
        setPreviousIndex(i);
        return (i + 1) % textures.length;
      });
    }

    transitionRef.current = Math.min(1, transitionRef.current + delta / TRANSITION_DURATION);
    const easedTransition = THREE.MathUtils.smoothstep(transitionRef.current, 0, 1);
    setGroupOpacity(previousFrameRef.current, 1 - easedTransition);
    setGroupOpacity(currentFrameRef.current, easedTransition);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      Math.sin(performance.now() * 0.00045) * 0.34 + pointer.x * 0.08,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.15,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -pointer.x * 0.08,
      0.05
    );
  });

  const currentMockup = MOCKUPS[screenIndex];
  const previousMockup = MOCKUPS[previousIndex];

  return (
    <group ref={groupRef}>
      <MockupFrame ref={previousFrameRef} kind={previousMockup.kind} texture={textures[previousIndex]} />
      <MockupFrame ref={currentFrameRef} kind={currentMockup.kind} texture={textures[screenIndex]} />
    </group>
  );
}

export const HeroPhoneScene: React.FC = () => (
  <>
    <ambientLight intensity={0.55} />
    <directionalLight position={[3, 4, 5]} intensity={1.4} color="#38bdf8" />
    <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#fb7185" />
    <pointLight position={[0, 0, 2.5]} intensity={0.6} color="#e0f2fe" />
    <PhoneModel />
  </>
);

export const HeroPhoneFallback: React.FC = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <img
      src="/word-01-home.webp"
      alt="WoRD app preview"
      className="w-[140px] rounded-[1.25rem] border border-white/10 shadow-xl shadow-sky-950/30"
    />
  </div>
);
