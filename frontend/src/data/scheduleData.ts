import { TimelineItem } from "../components/ui/radial-orbital-timeline";

export const orbitalTimelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Oct 7 : Day 1",
    date: "Oct 7, 2026",
    content: "Internal Hackathon screening & selection sprint.",
    category: "Day 1",
    icon: () => null,
    relatedIds: [],
    status: "completed",
    energy: 100,
    scheduleItems: [
      "Internal Hackathon",
      "9am to 5 pm .",
      "3 levels",
      "Top 100 teams will be selected"
    ]
  },
  {
    id: 2,
    title: "Oct 8 : Day 2",
    date: "Oct 8, 2026",
    content: "Main 24-hour hackathon commencement & schedule.",
    category: "Day 2",
    icon: () => null,
    relatedIds: [],
    status: "in-progress",
    energy: 100,
    scheduleItems: [
      "7:30 AM - Participant Arrival & Registration (Exclusive HackNex Kit distribution!)",
      "8:30 AM - Opening Ceremony & Hackathon Briefing",
      "9:30 AM - Build Phase #1",
      "12:00 PM - Lunch Break",
      "1:00 PM - Build Phase #2",
      "4:00 PM - Break",
      "4:15 PM - Jury Review & Progress Check",
      "5:15 PM - Build Phase #3",
      "7:30 PM - Dinner Break",
      "8:30 PM - Build Phase #4",
      "10:30 PM - Break",
      "10:45 PM - Overnight Build",
      "4:00 AM - Build & Development",
      "6:30 AM - Breakfast Break",
      "8:00 AM - Final Sprint & Submission Preparation"
    ]
  },
  {
    id: 3,
    title: "Oct 9 : Day 3",
    date: "Oct 9, 2026",
    content: "Grand Finale & Closing Ceremony.",
    category: "Day 3",
    icon: () => null,
    relatedIds: [],
    status: "pending",
    energy: 100,
    scheduleItems: [
      "8:30 AM - Final Submission & Jury Screening",
      "9:30 AM - Top 15 Finalists Announced",
      "9:40 AM - Final Pitch & Presentation",
      "11:15 AM - Chief Guest Session",
      "12:15 PM - Awards & Prize Distribution",
      "12:37 PM - Event Conclusion and Photos"
    ]
  }
];

export interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  category: 'build' | 'jury' | 'break' | 'ceremony' | 'registration';
  status: 'completed' | 'in-progress' | 'upcoming';
  highlight?: boolean;
}

export interface ScheduleDay {
  id: number;
  stageNumber: string;
  badge: string;
  date: string;
  dayLabel: string;
  tagline: string;
  location: string;
  duration: string;
  accent: 'amber' | 'cyan' | 'purple';
  events: ScheduleEvent[];
}

export const scheduleData: ScheduleDay[] = [
  {
    id: 1,
    stageNumber: 'STAGE 01',
    badge: 'QUALIFIER SPRINT',
    date: 'OCTOBER 7, 2026',
    dayLabel: 'Day 1 — Internal Qualifier',
    tagline: 'Internal Hackathon screening, team selection, and 3-level technical sprint.',
    location: 'Karunya Tech Labs & Idea Hub',
    duration: '8 Hours Sprint',
    accent: 'amber',
    events: [
      {
        time: '09:00 AM - 10:00 AM',
        title: 'Team Assembly & Registration',
        description: 'Verification of registered squads, badge allocation, and workspace assignment.',
        category: 'registration',
        status: 'upcoming',
      },
      {
        time: '10:00 AM - 01:00 PM',
        title: 'Level 1: Architecture & Technical Feasibility',
        description: 'Initial idea screening, domain selection, and system architecture blueprinting.',
        category: 'build',
        status: 'upcoming',
        highlight: true,
      },
      {
        time: '01:00 PM - 02:00 PM',
        title: 'Networking Lunch & Strategy Break',
        description: 'Connect with peers, refuel, and consult domain mentors on technical hurdles.',
        category: 'break',
        status: 'upcoming',
      },
      {
        time: '02:00 PM - 04:00 PM',
        title: 'Level 2: Rapid MVP Prototype Sprint',
        description: 'Time-boxed speedrun to construct proof-of-concept and executable demos.',
        category: 'build',
        status: 'upcoming',
      },
      {
        time: '04:00 PM - 05:00 PM',
        title: 'Level 3: Jury Evaluation & Top 100 Announcement',
        description: 'Rigorous faculty & industry evaluation. The top 100 teams qualify for the 24H Arena!',
        category: 'jury',
        status: 'upcoming',
        highlight: true,
      },
    ],
  },
  {
    id: 2,
    stageNumber: 'STAGE 02',
    badge: '24-HOUR NON-STOP ARENA',
    date: 'OCTOBER 8, 2026',
    dayLabel: 'Day 2 — 24H Hackathon Sprint',
    tagline: 'The flagship 24-hour endurance hackathon with live mentoring, reviews, and overnight sprint.',
    location: 'Main Indoor Arena & Hacker Dome',
    duration: '24 Hours Continuous',
    accent: 'cyan',
    events: [
      {
        time: '07:30 AM - 08:30 AM',
        title: 'Participant Check-in & HackNex Kit Unboxing',
        description: 'Arrival of national qualifiers, swag distribution, and badge claiming.',
        category: 'registration',
        status: 'upcoming',
      },
      {
        time: '08:30 AM - 09:30 AM',
        title: 'Opening Ceremony & Grand Keynote Briefing',
        description: 'Welcome by distinguished leadership, domain track reveals, and hackathon rules.',
        category: 'ceremony',
        status: 'upcoming',
        highlight: true,
      },
      {
        time: '09:30 AM - 12:00 PM',
        title: 'Build Phase #1: Foundation & API Scaffolding',
        description: 'Hacking begins! Teams initiate repo setups, cloud environments, and core modules.',
        category: 'build',
        status: 'upcoming',
      },
      {
        time: '12:00 PM - 01:00 PM',
        title: 'Power Lunch & Energy Refuel',
        description: 'Nutritious buffet lunch and quick breather for all registered builders.',
        category: 'break',
        status: 'upcoming',
      },
      {
        time: '01:00 PM - 04:00 PM',
        title: 'Build Phase #2: Intelligence & Algorithm Core',
        description: 'Deep engineering sprint focusing on local models, agent logic, and front-end polish.',
        category: 'build',
        status: 'upcoming',
      },
      {
        time: '04:00 PM - 04:15 PM',
        title: 'Snack & Tea Hiatus',
        description: 'High tea and refreshment stations open across the floor.',
        category: 'break',
        status: 'upcoming',
      },
      {
        time: '04:15 PM - 05:15 PM',
        title: 'Jury Round 1: Mid-Point Review & Mentorship',
        description: 'Panels inspect progress, offer architecture course corrections, and score milestones.',
        category: 'jury',
        status: 'upcoming',
        highlight: true,
      },
      {
        time: '05:15 PM - 07:30 PM',
        title: 'Build Phase #3: Systems Integration',
        description: 'Connecting back-end services, security safeguards, and multi-modal interfaces.',
        category: 'build',
        status: 'upcoming',
      },
      {
        time: '07:30 PM - 08:30 PM',
        title: 'Gala Dinner & Acoustic Chill Session',
        description: 'Hot dinner served with live ambient music and gaming break zone.',
        category: 'break',
        status: 'upcoming',
      },
      {
        time: '08:30 PM - 10:30 PM',
        title: 'Build Phase #4: Feature Completeness Sprint',
        description: 'Stabilizing end-to-end user journeys and finalizing test suites.',
        category: 'build',
        status: 'upcoming',
      },
      {
        time: '10:30 PM - 10:45 PM',
        title: 'Midnight Energy & Caffeine Surge',
        description: 'Specialty coffee, energy drinks, and fresh pastries for the nocturnal push.',
        category: 'break',
        status: 'upcoming',
      },
      {
        time: '10:45 PM - 04:00 AM',
        title: 'The Overnight Crucible: Midnight Flow State',
        description: 'Quiet hours engineering. Mentors on call; teams push hard on killer features.',
        category: 'build',
        status: 'upcoming',
        highlight: true,
      },
      {
        time: '04:00 AM - 06:30 AM',
        title: 'Pre-Dawn Optimization & Stress Testing',
        description: 'Performance benchmarking, UI responsiveness, and edge-case handling.',
        category: 'build',
        status: 'upcoming',
      },
      {
        time: '06:30 AM - 08:00 AM',
        title: 'Sunrise Breakfast & Mountain View Refresh',
        description: 'Warm South Indian breakfast and outdoor fresh air by the Western Ghats.',
        category: 'break',
        status: 'upcoming',
      },
      {
        time: '08:00 AM - 08:30 AM',
        title: 'Code Freeze & Devpost Project Submission',
        description: 'Final commit lock, video pitch upload, and presentation slide validation.',
        category: 'ceremony',
        status: 'upcoming',
        highlight: true,
      },
    ],
  },
  {
    id: 3,
    stageNumber: 'STAGE 03',
    badge: 'GRAND FINALE & PODIUM',
    date: 'OCTOBER 9, 2026',
    dayLabel: 'Day 3 — Grand Finale & Closing',
    tagline: 'Final pitch battles, keynote dignitary addresses, and ₹1,60,000 awards gala.',
    location: 'University Central Auditorium',
    duration: '5 Hours Gala',
    accent: 'purple',
    events: [
      {
        time: '08:30 AM - 09:30 AM',
        title: 'Jury Round 2: Comprehensive Code & Demo Screening',
        description: 'Jury benchmarks code quality, real-world applicability, and innovative edge.',
        category: 'jury',
        status: 'upcoming',
      },
      {
        time: '09:30 AM - 09:40 AM',
        title: 'Announcement: Top 15 National Finalists',
        description: 'The highest-ranking squads advance to the Grand Stage for live demo showdown.',
        category: 'ceremony',
        status: 'upcoming',
        highlight: true,
      },
      {
        time: '09:40 AM - 11:15 AM',
        title: 'Grand Stage Demos & Live Pitch Battles',
        description: 'Top 15 teams deliver 4-minute pitches and 2-minute live Q&A in front of all attendees.',
        category: 'build',
        status: 'upcoming',
        highlight: true,
      },
      {
        time: '11:15 AM - 12:15 PM',
        title: 'Chief Guest Keynote & Industry Valedictory',
        description: 'Keynote address by esteemed tech leaders and felicitation of academic mentors.',
        category: 'ceremony',
        status: 'upcoming',
      },
      {
        time: '12:15 PM - 12:45 PM',
        title: 'Grand Awards & ₹1,60,000 Prize Distribution',
        description: 'Revealing the winners of ₹75,000 1st Prize, Runner-up trophies, and sponsor bounties.',
        category: 'ceremony',
        status: 'upcoming',
        highlight: true,
      },
      {
        time: '12:45 PM - 01:15 PM',
        title: 'Closing Celebrations & Official Squad Photos',
        description: 'Commemorative photos, certificate distribution, and celebration banquet.',
        category: 'ceremony',
        status: 'upcoming',
      },
    ],
  },
];
