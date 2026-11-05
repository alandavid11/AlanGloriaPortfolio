import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    company: 'ITJuana',
    role: 'iOS Engineer',
    period: 'Jul 2024 – Present',
    context: 'Remote · Consulting · Clinical iOS SDK (Healthcare) · V&V',
    summary:
      'Verification and validation across an entire clinical-grade iOS SDK: native UI suites, Appium automation, the CI that runs them, and the team’s AI-assisted development standard.',
    highlights: [
      'Took the native iOS CI from a 30% to a 99% daily pass rate across 550+ tests by adding variable parallelization across the available machines, cutting execution time by at least half.',
      'Found a day-zero bug where Appium could not read SpringBoard while pairing with the transmitter. For about two years it was the #1 cause of iOS transmitter test failures, 8 to 10 minutes lost per failed run; failures from it dropped to zero.',
      'Fixed two release-wide CI breakages that the device lab, tools and native teams could not: devices stuck in “preparing device” stalling the whole iOS Appium run, and an app-uninstall failure breaking every native UI test.',
      'Built a tool to run and publish native iOS test results on demand, where before only CI could.',
      'Analyzed the app architecture to remove bottlenecks hit by 347 tagged regression tests: critical-path run 5h46m → ~4h23m (~24%), freeing ~7.3 machine-hours per full run across 7 parallel CI machines.',
      'Architected GitHub Actions + Fastlane CI/CD (~40% faster builds), enabling weekly releases with zero rollbacks in 9 months.',
      'Led GitHub Copilot and Gemini CLI adoption, freeing the capacity to run two SDK release tracks in parallel for the first time without adding headcount.',
    ],
    metrics: [
      { value: '30→99%', label: 'daily pass rate, 550+ tests' },
      { value: '≥50%', label: 'less CI run time' },
      { value: '0', label: 'SpringBoard timeouts' },
      { value: '-24%', label: 'regression runtime' },
    ],
    logo: '/itjuana-logo.webp',
    tags: ['Swift', 'XCTest', 'Appium', 'Fastlane', 'GitHub Actions'],
  },
  {
    company: 'IBM',
    role: 'iOS Engineer',
    period: 'May 2023 – May 2024',
    context: 'Remote · US Home-Improvement Retail · 3.1M active users',
    summary:
      'End-to-end feature ownership on a top US retail iOS app — SwiftUI/UIKit hybrid surfaces, analytics integrity, crash stability, and push re-engagement.',
    highlights: [
      'Pioneered GitHub Copilot on the iOS squad; team handled significantly more concurrent work within unchanged sprint capacity.',
      'Integrated Embrace SDK — crash-free sessions 99.71% → 99.97% on a 3.1M-user app.',
      'Rebuilt analytics layer (+20% funnel accuracy); Airship push flows contributed to +15% 30-day retention.',
      'Resolved critical deep-link failures; documentation became the team reference for URL schemes & Universal Links.',
    ],
    metrics: [
      { value: '3.1M', label: 'active users' },
      { value: '99.97%', label: 'crash-free' },
      { value: '+15%', label: '30-day retention' },
    ],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    tags: ['SwiftUI', 'UIKit', 'Embrace', 'Airship', 'GitHub Copilot'],
  },
  {
    company: 'Freelance',
    role: 'iOS Developer',
    period: 'Jan 2022 – May 2023',
    context: 'Saltillo, MX · B2C · Restaurant Discovery',
    summary:
      'Solo-built a native restaurant discovery app from zero through App Store release — architecture, UI/UX, Firebase backend, and post-launch updates.',
    highlights: [
      'Shipped with Swift, SwiftUI, MVVM, Firebase Auth/Firestore, and Core Location maps & routing.',
      'Refactored to Clean Architecture with SPM modules; HIG-native UI designed from scratch.',
      'Owned full lifecycle: prototyping, App Store submission, and iteration on user feedback.',
    ],
    metrics: [
      { value: '0→1', label: 'App Store ship' },
      { value: 'MVVM', label: '+ Clean Arch' },
      { value: 'Firebase', label: 'full stack' },
    ],
    logo: 'https://cdn-icons-png.flaticon.com/512/3850/3850285.png',
    tags: ['SwiftUI', 'Firebase', 'MVVM', 'SPM', 'App Store'],
  },
  {
    company: 'BorgWarner',
    role: 'Software & CI Engineer',
    period: 'Feb 2021 – May 2023',
    context: 'Saltillo, MX · Automotive Manufacturing',
    summary:
      'Built shop-floor tools in Swift & C# across 3 production lines — SQL systems, Power BI dashboards, and digital suggestion platform for 1,800+ employees.',
    highlights: [
      'Scrap recovery tooling saved $172K USD annually by eliminating permanent write-offs.',
      'Scan cycle time 20s → 8s; quality rework 4h → 1.5h via automated reconciliation workflows.',
      'Mentored 3 trainees through first production-grade apps; applied SMED/5S reducing changeover 3h → 1.3h.',
    ],
    metrics: [
      { value: '$172K', label: 'annual savings' },
      { value: '1,800+', label: 'employees on BI' },
      { value: '60%', label: 'faster scans' },
    ],
    logo: '/borgwarner-logo.webp',
    tags: ['Swift', 'C#', 'SQL', 'Power BI', 'Manufacturing'],
  },
];
