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
      "9am opening ceremony",
      "9.30am Guest Talk",
      "10am 24 hackathon commences",
      "1pm lunch",
      "5pm snack break",
      "8pm Dinner"
    ]
  },
  {
    id: 3,
    title: "Oct 9 : Day 3",
    date: "Oct 9, 2026",
    content: "Overnight refreshments, final evaluation & closing ceremony.",
    category: "Day 3",
    icon: () => null,
    relatedIds: [],
    status: "pending",
    energy: 100,
    scheduleItems: [
      "12am Refreshments",
      "4am Refreshments",
      "7am Breakfast",
      "10am Judgements",
      "12pm Prize Distribution + Closing Ceremony"
    ]
  }
];

export const scheduleData = [
  {
    date: 'OCTOBER 7, 2026',
    dayLabel: 'DAY 1 — INTERNAL SPRINT',
    events: [
      { time: '09:00 AM - 05:00 PM', title: 'Internal Hackathon', description: '3 levels. Top 100 teams will be selected.', status: 'upcoming' as const },
    ],
  },
  {
    date: 'OCTOBER 8, 2026',
    dayLabel: 'DAY 2 — MAIN HACKATHON SPRINT',
    events: [
      { time: '09:00 AM', title: 'Opening Ceremony', description: '9am opening ceremony.', status: 'upcoming' as const },
      { time: '09:30 AM', title: 'Guest Talk', description: '9.30am Guest Talk.', status: 'upcoming' as const },
      { time: '10:00 AM', title: '24 Hackathon Commences', description: '10am 24 hackathon commences.', status: 'upcoming' as const },
      { time: '01:00 PM', title: 'Lunch', description: '1pm lunch.', status: 'upcoming' as const },
      { time: '05:00 PM', title: 'Snack Break', description: '5pm snack break.', status: 'upcoming' as const },
      { time: '08:00 PM', title: 'Dinner', description: '8pm Dinner.', status: 'upcoming' as const },
    ],
  },
  {
    date: 'OCTOBER 9, 2026',
    dayLabel: 'DAY 3 — FINALS & CEREMONY',
    events: [
      { time: '12:00 AM', title: 'Refreshments', description: '12am Refreshments.', status: 'upcoming' as const },
      { time: '04:00 AM', title: 'Refreshments', description: '4am Refreshments.', status: 'upcoming' as const },
      { time: '07:00 AM', title: 'Breakfast', description: '7am Breakfast.', status: 'upcoming' as const },
      { time: '10:00 AM', title: 'Judgements', description: '10am Judgements.', status: 'upcoming' as const },
      { time: '12:00 PM', title: 'Prize Distribution + Closing Ceremony', description: '12pm Prize Distribution + Closing Ceremony.', status: 'upcoming' as const },
    ],
  },
];
