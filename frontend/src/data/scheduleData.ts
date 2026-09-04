export interface ScheduleDay {
  date: string;
  dayLabel: string;
  events: {
    time: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
  }[];
}

export const scheduleData: ScheduleDay[] = [
  {
    date: 'OCTOBER 7, 2026',
    dayLabel: 'DAY 1 — INAUGURATION & INTERNAL SPRINT',
    events: [
      { time: '08:00 AM', title: 'Check-in & Desk Registration', description: 'Participant badge collection and team desk allocation at Karunya Auditorium.', status: 'upcoming' },
      { time: '10:00 AM', title: 'Grand Opening Ceremony', description: 'Welcome address by NEXUS Club and Karunya leadership, problem statement release.', status: 'upcoming' },
      { time: '11:30 AM', title: 'Hacking Phase 1 Begins', description: '36-hour continuous hackathon officially commences.', status: 'upcoming' },
      { time: '07:00 PM', title: 'Mentorship Check-in 1', description: 'Domain experts review initial architecture and project scope.', status: 'upcoming' },
    ],
  },
  {
    date: 'OCTOBER 8, 2026',
    dayLabel: 'DAY 2 — MAIN HACKATHON SPRINT',
    events: [
      { time: '08:00 AM', title: 'Breakfast & Mid-Hack Check-in', description: 'Energy recharge and progress review.', status: 'upcoming' },
      { time: '02:00 PM', title: 'Mentorship Check-in 2', description: 'Technical refinement, API integration, and MVP evaluation.', status: 'upcoming' },
      { time: '11:59 PM', title: 'Overnight Coding & Debugging', description: 'Final sprint prep ahead of project freeze.', status: 'upcoming' },
    ],
  },
  {
    date: 'OCTOBER 9, 2026',
    dayLabel: 'DAY 3 — SUBMISSION & FINALS',
    events: [
      { time: '09:00 AM', title: 'Code Freeze & Devpost Submission', description: 'Final GitHub repository commit freeze and video submission.', status: 'upcoming' },
      { time: '11:00 AM', title: 'Jury Pitching Rounds', description: 'Top team live demonstrations in front of expert judging panel.', status: 'upcoming' },
      { time: '03:30 PM', title: 'Valedictory & Prize Distribution', description: 'Winners announcement and ₹1.5L+ cash prize awards ceremony.', status: 'upcoming' },
    ],
  },
];
