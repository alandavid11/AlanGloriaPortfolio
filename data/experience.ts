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
      'Raised the native iOS CI daily pass rate from 30% to 99% across 550+ automated tests by introducing variable parallelization across the available build machines, cutting execution time by at least 50%.',
      'Diagnosed and fixed a day-zero defect where Appium could not read SpringBoard during transmitter pairing. It had been the #1 cause of iOS transmitter test failures for about two years (8 to 10 minutes lost per failed run); failures from it dropped to zero.',
      'Wrote a device-health repair script that resolved two release-wide CI outages the device lab, tools and native teams could not fix: devices stuck in “preparing device” stalling the full iOS Appium run, and an app-uninstall failure breaking every native UI test.',
      'Architected the GitHub Actions and Fastlane CI/CD pipeline, cutting build times by ~40% and enabling weekly releases with zero rollbacks over nine months; removed architectural bottlenecks hit by 347 regression tests, reducing the critical-path run from 5h46m to ~4h23m (~24%).',
      'Led GitHub Copilot and Gemini CLI adoption, freeing the capacity to run two SDK release tracks in parallel for the first time without adding headcount; built a tool to run and publish native iOS test results on demand, previously possible only through CI.',
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
      'End-to-end feature ownership on a top US retail iOS app: SwiftUI/UIKit hybrid surfaces, analytics integrity, crash stability, and push re-engagement.',
    highlights: [
      'Owned the Embrace SDK integration for crash reporting; the visibility it added underpinned a stability push that raised crash-free sessions from 99.71% to 99.97% on an app with 3.1M active users.',
      'Rebuilt the analytics layer, improving funnel accuracy by 20%, and shipped Airship push flows that contributed to a 15% lift in 30-day retention.',
      'Owned features end to end across hybrid SwiftUI and UIKit surfaces and resolved critical deep-link failures; my write-up became the team reference for URL schemes and Universal Links.',
      'Introduced GitHub Copilot to the iOS squad as its first adopter.',
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
      'Solo-built a native restaurant discovery app from zero through App Store release: architecture, UI/UX, Firebase backend, and post-launch updates.',
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
    role: 'Software Engineer, Manufacturing Systems',
    period: 'Feb 2021 – May 2023',
    context: 'Saltillo, MX · Automotive Manufacturing',
    summary:
      'Built shop-floor tools in Swift & C# across 3 production lines: SQL systems, Power BI dashboards, and digital suggestion platform for 1,800+ employees.',
    highlights: [
      'Built scrap-recovery tooling that saved $172K USD annually by eliminating permanent write-offs.',
      'Automated reconciliation workflows that cut scan cycle time from 20s to 8s and quality rework from 4h to 1.5h.',
      'Developed shop-floor software in Swift and C# across 3 production lines, plus SQL systems, Power BI dashboards and a digital suggestion platform used by 1,800+ employees; mentored 3 trainees through their first production apps.',
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
