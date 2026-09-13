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
    dayLabel: 'DAY 2 — 24-HOUR HACKATHON',
    events: [
      { time: '07:30 AM - 08:30 AM', title: 'Participant Arrival & Registration', description: 'Exclusive HackNex Kit distribution!', status: 'upcoming' as const },
      { time: '08:30 AM - 09:30 AM', title: 'Opening Ceremony & Hackathon Briefing', description: 'Opening Ceremony & Hackathon Briefing', status: 'upcoming' as const },
      { time: '09:30 AM - 12:00 PM', title: 'Build Phase #1', description: 'Build Phase #1', status: 'upcoming' as const },
      { time: '12:00 PM - 01:00 PM', title: 'Lunch Break', description: 'Lunch Break', status: 'upcoming' as const },
      { time: '01:00 PM - 04:00 PM', title: 'Build Phase #2', description: 'Build Phase #2', status: 'upcoming' as const },
      { time: '04:00 PM - 04:15 PM', title: 'Break', description: 'Break', status: 'upcoming' as const },
      { time: '04:15 PM - 05:15 PM', title: 'Jury Review & Progress Check', description: 'Jury Review & Progress Check', status: 'upcoming' as const },
      { time: '05:15 PM - 07:30 PM', title: 'Build Phase #3', description: 'Build Phase #3', status: 'upcoming' as const },
      { time: '07:30 PM - 08:30 PM', title: 'Dinner Break', description: 'Dinner Break', status: 'upcoming' as const },
      { time: '08:30 PM - 10:30 PM', title: 'Build Phase #4', description: 'Build Phase #4', status: 'upcoming' as const },
      { time: '10:30 PM - 10:45 PM', title: 'Break', description: 'Break', status: 'upcoming' as const },
      { time: '10:45 PM - 04:00 AM', title: 'Overnight Build', description: 'Overnight Build', status: 'upcoming' as const },
      { time: '04:00 AM - 06:30 AM', title: 'Build & Development', description: 'Build & Development', status: 'upcoming' as const },
      { time: '06:30 AM - 08:00 AM', title: 'Breakfast Break', description: 'Breakfast Break', status: 'upcoming' as const },
      { time: '08:00 AM - 08:30 AM', title: 'Final Sprint & Submission Preparation', description: 'Final Sprint & Submission Preparation', status: 'upcoming' as const },
    ],
  },
  {
    date: 'OCTOBER 9, 2026',
    dayLabel: 'DAY 3 — GRAND FINALE & CLOSING',
    events: [
      { time: '08:30 AM - 09:30 AM', title: 'Final Submission & Jury Screening', description: 'Final Submission & Jury Screening.', status: 'upcoming' as const },
      { time: '09:30 AM - 09:40 AM', title: 'Top 15 Finalists Announced', description: 'Top 15 Finalists Announced.', status: 'upcoming' as const },
      { time: '09:40 AM - 10:55 AM', title: 'Final Pitch & Presentation', description: 'Final Pitch & Presentation.', status: 'upcoming' as const },
      { time: '11:15 AM - 12:15 PM', title: 'Chief Guest Session', description: 'Chief Guest Session.', status: 'upcoming' as const },
      { time: '12:15 PM - 12:35 PM', title: 'Awards & Prize Distribution', description: 'Awards & Prize Distribution.', status: 'upcoming' as const },
      { time: '12:37 PM - 01:00 PM', title: 'Event Conclusion and Photos', description: 'Event Conclusion and Photos.', status: 'upcoming' as const },
    ],
  },
];
