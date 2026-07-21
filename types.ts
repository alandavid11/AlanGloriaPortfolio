import { ReactNode } from 'react';

export type ViewState = 'portfolio' | 'app-detail' | 'remainingweeks-detail' | 'triplook-detail' | 'raro-detail';

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  action?: () => void;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  context: string;
  summary: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
  logo: string;
  tags: string[];
}

export interface SkillItem {
  name: string;
  color: string;
  textColor?: string;
}

export interface ToolItem {
  name: string;
  description: string;
  type: string;
  icon: ReactNode;
  gradient: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location?: string;
}
