export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqCategories = [
  'ALL',
  'REGISTRATION',
  'TEAMS',
  'PAYMENT',
  'EVENT',
  'ELIGIBILITY',
  'VENUE',
  'COMMUNICATION',
  'TECHNICAL',
];

export const faqData: FAQItem[] = [
  // Registration
  {
    id: 'faq-1',
    category: 'REGISTRATION',
    question: 'How do I register my team for HackNEX 2026?',
    answer: 'Registration is performed by the Team Captain. Click "REGISTER NOW", create/login to your account, verify your email, create a team, and fill in details for all 4 team members.',
  },
  {
    id: 'faq-2',
    category: 'REGISTRATION',
    question: 'What is the deadline for registration?',
    answer: 'Registration deadlines and round updates will be communicated through registered email and official social channels.',
  },
  {
    id: 'faq-3',
    category: 'REGISTRATION',
    question: 'Can I edit team details after submitting registration?',
    answer: 'Team captain details can be managed via the captain portal prior to registration status lock.',
  },

  // Teams
  {
    id: 'faq-4',
    category: 'TEAMS',
    question: 'What is the mandatory team size for HackNEX?',
    answer: 'Every team MUST consist of exactly 4 members (1 Team Captain + 3 Team Members). Teams with fewer or more members cannot complete registration.',
  },
  {
    id: 'faq-5',
    category: 'TEAMS',
    question: 'Are cross-college and cross-department teams allowed?',
    answer: 'Yes! HackNEX encourages interdisciplinary collaboration. Team members can be from different colleges, departments, or academic years.',
  },
  {
    id: 'faq-6',
    category: 'TEAMS',
    question: 'Can a participant belong to multiple teams?',
    answer: 'No. Each participant email and phone number can only be registered under one team.',
  },

  // Payment
  {
    id: 'faq-7',
    category: 'PAYMENT',
    question: 'What is the registration fee for HackNEX?',
    answer: 'The registration fee is ₹600 per team of 4 participants.',
  },
  {
    id: 'faq-8',
    category: 'PAYMENT',
    question: 'How is payment verified?',
    answer: 'Payment verification details will be guided step-by-step through the payment gateway verification flow upon registration.',
  },
  {
    id: 'faq-9',
    category: 'PAYMENT',
    question: 'Is the registration fee refundable?',
    answer: 'Registration fee policies and terms will be governed according to the official event guidelines.',
  },

  // Event
  {
    id: 'faq-10',
    category: 'EVENT',
    question: 'What are the official dates for HackNEX 2026?',
    answer: 'HackNEX 2026 takes place offline from October 7 to October 9, 2026.',
  },
  {
    id: 'faq-11',
    category: 'EVENT',
    question: 'Is HackNEX an online or offline hackathon?',
    answer: 'HackNEX is a 100% offline hackathon hosted at Karunya Institute of Technology and Sciences, Coimbatore.',
  },

  // Eligibility
  {
    id: 'faq-12',
    category: 'ELIGIBILITY',
    question: 'Who is eligible to participate in HackNEX?',
    answer: 'Undergraduate, postgraduate, and diploma students from recognized academic institutions are eligible to participate.',
  },
  {
    id: 'faq-13',
    category: 'ELIGIBILITY',
    question: 'Are food preferences recorded for participants?',
    answer: 'Yes. Food preferences (Vegetarian / Non-Vegetarian) are recorded individually for each of the 4 team members during registration.',
  },

  // Venue
  {
    id: 'faq-14',
    category: 'VENUE',
    question: 'Where is the hackathon venue located?',
    answer: 'The venue is Karunya Institute of Technology and Sciences, Karunya Nagar, Coimbatore, Tamil Nadu 641114.',
  },
  {
    id: 'faq-15',
    category: 'VENUE',
    question: 'Will accommodation be provided for outstation teams?',
    answer: 'Detailed accommodation guidelines and campus lodging arrangements will be announced prior to the event.',
  },

  // Communication
  {
    id: 'faq-16',
    category: 'COMMUNICATION',
    question: 'How will participants receive hackathon updates?',
    answer: 'All official notifications, check-in instructions, and schedule announcements will be delivered to the captain\'s registered email address.',
  },

  // Technical
  {
    id: 'faq-17',
    category: 'TECHNICAL',
    question: 'What domain tracks are available at HackNEX?',
    answer: 'Tracks include AI & ML, Cybersecurity, FinTech, HealthTech, Web3, and Sustainability & Open Innovation.',
  },
  {
    id: 'faq-18',
    category: 'TECHNICAL',
    question: 'What hardware/software must teams bring?',
    answer: 'Teams must bring their own laptops, chargers, extension cords, and hardware development kits required for their project.',
  },
];
