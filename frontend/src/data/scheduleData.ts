import { Calendar, Code, Trophy } from "lucide-react";
import { TimelineItem } from "../components/ui/radial-orbital-timeline";

export const orbitalTimelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Oct 7 : Day 1",
    date: "Oct 7, 2026",
    content: "Internal Hackathon (9am to 5pm) across 3 screening levels. Top 100 teams will be selected for the main hackathon.",
    category: "Day 1",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 95,
    scheduleItems: [
      "9:00 AM - 5:00 PM: Internal Hackathon",
      "3 Screening Levels Evaluation",
      "Top 100 Teams Selected"
    ]
  },
  {
    id: 2,
    title: "Oct 8 : Day 2",
    date: "Oct 8, 2026",
    content: "Opening Ceremony, Keynote Guest Talk, and commencement of the 24-Hour continuous hackathon sprint with meals & refreshments.",
    category: "Day 2",
    icon: Code,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 100,
    scheduleItems: [
      "9:00 AM: Opening Ceremony",
      "9:30 AM: Guest Talk & Keynote",
      "10:00 AM: 24-Hour Hackathon Commences",
      "1:00 PM: Lunch Break",
      "5:00 PM: Evening Snack Break",
      "8:00 PM: Dinner"
    ]
  },
  {
    id: 3,
    title: "Oct 9 : Day 3",
    date: "Oct 9, 2026",
    content: "Overnight coding & refreshments, morning breakfast, final expert panel judgements, and prize distribution closing ceremony.",
    category: "Day 3",
    icon: Trophy,
    relatedIds: [2],
    status: "pending",
    energy: 85,
    scheduleItems: [
      "12:00 AM: Midnight Refreshments",
      "4:00 AM: Early Morning Refreshments",
      "7:00 AM: Breakfast",
      "10:00 AM: Judgements & Evaluation",
      "12:00 PM: Prize Distribution + Closing Ceremony"
    ]
  }
];

export const scheduleData = [
  {
    date: 'OCTOBER 7, 2026',
    dayLabel: 'DAY 1 — INAUGURATION & INTERNAL SPRINT',
    events: [
      { time: '09:00 AM - 05:00 PM', title: 'Internal Hackathon (3 Levels)', description: 'Internal hackathon screening levels. Top 100 teams selected.', status: 'upcoming' as const },
    ],
  },
  {
    date: 'OCTOBER 8, 2026',
    dayLabel: 'DAY 2 — MAIN HACKATHON SPRINT',
    events: [
      { time: '09:00 AM', title: 'Opening Ceremony', description: 'Welcome address by leadership.', status: 'upcoming' as const },
      { time: '09:30 AM', title: 'Guest Talk', description: 'Keynote session with industry veterans.', status: 'upcoming' as const },
      { time: '10:00 AM', title: '24-Hour Hackathon Commences', description: 'Non-stop hacking sprint begins.', status: 'upcoming' as const },
      { time: '01:00 PM', title: 'Lunch Break', description: 'Complimentary lunch for all participants.', status: 'upcoming' as const },
      { time: '05:00 PM', title: 'Snack Break', description: 'Evening tea & snacks.', status: 'upcoming' as const },
      { time: '08:00 PM', title: 'Dinner', description: 'Night dinner provided.', status: 'upcoming' as const },
    ],
  },
  {
    date: 'OCTOBER 9, 2026',
    dayLabel: 'DAY 3 — SUBMISSION & FINALS',
    events: [
      { time: '12:00 AM', title: 'Refreshments', description: 'Midnight snack & energy drinks.', status: 'upcoming' as const },
      { time: '04:00 AM', title: 'Refreshments', description: 'Early morning coffee & snacks.', status: 'upcoming' as const },
      { time: '07:00 AM', title: 'Breakfast', description: 'Morning breakfast served.', status: 'upcoming' as const },
      { time: '10:00 AM', title: 'Judgements', description: 'Live pitch & evaluation by expert jury.', status: 'upcoming' as const },
      { time: '12:00 PM', title: 'Prize Distribution + Closing Ceremony', description: 'Valedictory & ₹1.5L+ awards distribution.', status: 'upcoming' as const },
    ],
  },
];
