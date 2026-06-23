import React, { lazy, useMemo } from 'react';
import { Lazy3D } from './Lazy3D';
import { SceneCanvas } from './SceneCanvas';
import { SkillsConstellationFallback } from './Fallbacks';
import {
  SkillsConstellationScene,
  ConstellationSkill,
} from './SkillsConstellation';

const GROUP_COLORS: Record<string, string> = {
  'iOS & Mobile': '#fb923c',
  'Quality & DevOps': '#f472b6',
  'Web & Data': '#38bdf8',
};

interface SkillsConstellation3DProps {
  skillGroups: { label: string; skills: { name: string; textColor?: string }[] }[];
}

function SkillsCanvas({ skills }: { skills: ConstellationSkill[] }) {
  return (
    <SceneCanvas className="w-full h-full" camera={{ position: [0, 0, 4], fov: 50 }}>
      <SkillsConstellationScene skills={skills} />
    </SceneCanvas>
  );
}

const LazySkills = lazy(async () => ({ default: SkillsCanvas }));

export const SkillsConstellation3D: React.FC<SkillsConstellation3DProps> = ({ skillGroups }) => {
  const skills = useMemo(
    () =>
      skillGroups.flatMap((g) =>
        g.skills.map((s) => ({
          name: s.name,
          group: g.label,
          color: GROUP_COLORS[g.label] ?? '#a1a1aa',
        }))
      ),
    [skillGroups]
  );

  return (
    <Lazy3D
      component={LazySkills}
      fallback={<SkillsConstellationFallback />}
      className="h-[220px] w-full rounded-2xl overflow-hidden border border-white/[0.06] mb-4"
      componentProps={{ skills }}
    />
  );
};
