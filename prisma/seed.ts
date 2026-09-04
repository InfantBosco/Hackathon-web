import { PrismaClient, FoodPreference, MediaCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting HackNEX 2026 database seed process...');

  // 1. Seed Domains
  console.log('📦 Seeding Hackathon Domains...');
  const domainsData = [
    {
      name: 'AI & Intelligent Systems',
      slug: 'ai-intelligent-systems',
      description: 'Generative AI, Agentic Workflows, Computer Vision, and Machine Learning applications.',
      icon: 'brain-circuit',
      displayOrder: 1,
      isActive: true,
    },
    {
      name: 'FinTech & Blockchain',
      slug: 'fintech-blockchain',
      description: 'Decentralized Finance, Smart Contracts, Digital Payments, and Fraud Detection.',
      icon: 'wallet',
      displayOrder: 2,
      isActive: true,
    },
    {
      name: 'Cybersecurity & Defense',
      slug: 'cybersecurity-defense',
      description: 'Zero Trust Architecture, Threat Intelligence, Cryptography, and Network Security.',
      icon: 'shield-check',
      displayOrder: 3,
      isActive: true,
    },
    {
      name: 'Healthcare & MedTech',
      slug: 'healthcare-medtech',
      description: 'Remote Patient Monitoring, Telemedicine, AI Diagnostics, and Medical Imaging.',
      icon: 'heart-pulse',
      displayOrder: 4,
      isActive: true,
    },
  ];

  for (const domain of domainsData) {
    await prisma.domain.upsert({
      where: { slug: domain.slug },
      update: domain,
      create: domain,
    });
  }

  // 2. Seed Schedule Items
  console.log('📅 Seeding Event Schedule Timeline...');
  const scheduleData = [
    {
      title: 'Opening Ceremony & Keynote Address',
      description: 'Welcome address by NEXUS Club & KITS Dignitaries. Announcement of tracks and rules.',
      startTime: new Date('2026-10-07T09:00:00.000Z'),
      endTime: new Date('2026-10-07T10:30:00.000Z'),
      location: 'Main Auditorium / Online Stream',
      day: 'Day 1',
      displayOrder: 1,
      isActive: true,
    },
    {
      title: 'Hacking Begins — Phase 1',
      description: 'Teams start coding, environment setup, and architecture validation.',
      startTime: new Date('2026-10-07T11:00:00.000Z'),
      endTime: new Date('2026-10-07T19:00:00.000Z'),
      location: 'Hackathon Halls',
      day: 'Day 1',
      displayOrder: 2,
      isActive: true,
    },
    {
      title: 'Mid-Hackathon Mentorship Review',
      description: 'Domain experts review progress, architecture design, and provide technical guidance.',
      startTime: new Date('2026-10-08T10:00:00.000Z'),
      endTime: new Date('2026-10-08T13:00:00.000Z'),
      location: 'Mentorship Arena',
      day: 'Day 2',
      displayOrder: 3,
      isActive: true,
    },
    {
      title: 'Final Code Freeze & Submission Deadline',
      description: 'GitHub code freeze, demo video submission, and presentation deck upload.',
      startTime: new Date('2026-10-09T12:00:00.000Z'),
      endTime: new Date('2026-10-09T13:00:00.000Z'),
      location: 'HackNEX Portal',
      day: 'Day 3',
      displayOrder: 4,
      isActive: true,
    },
  ];

  for (const item of scheduleData) {
    const existing = await prisma.scheduleItem.findFirst({
      where: { title: item.title, day: item.day },
    });
    if (!existing) {
      await prisma.scheduleItem.create({ data: item });
    }
  }

  // 3. Seed Prizes
  console.log('🏆 Seeding Hackathon Prizes...');
  const prizesData = [
    {
      title: 'Grand Winner (1st Prize)',
      description: 'Cash prize + Trophy + Certificate of Excellence + Direct Incubation Entry.',
      amount: 100000,
      position: 1,
      displayOrder: 1,
      isActive: true,
    },
    {
      title: 'First Runner Up (2nd Prize)',
      description: 'Cash prize + Shield + Certificate of Merit.',
      amount: 60000,
      position: 2,
      displayOrder: 2,
      isActive: true,
    },
    {
      title: 'Second Runner Up (3rd Prize)',
      description: 'Cash prize + Shield + Certificate of Merit.',
      amount: 40000,
      position: 3,
      displayOrder: 3,
      isActive: true,
    },
  ];

  for (const prize of prizesData) {
    const existing = await prisma.prize.findFirst({
      where: { position: prize.position },
    });
    if (!existing) {
      await prisma.prize.create({ data: prize });
    }
  }

  // 4. Seed FAQs
  console.log('❓ Seeding Frequently Asked Questions (FAQs)...');
  const faqsData = [
    {
      question: 'What is HackNEX 2026?',
      answer: 'HackNEX 2026 is a premier national-level offline hackathon organized by the NEXUS Club of Karunya Institute of Technology and Sciences (KITS), Coimbatore.',
      displayOrder: 1,
      isActive: true,
    },
    {
      question: 'How many members are required in a team?',
      answer: 'Every team must consist of EXACTLY 4 members (Captain + Member 2 + Member 3 + Member 4).',
      displayOrder: 2,
      isActive: true,
    },
    {
      question: 'What is the registration fee?',
      answer: 'The registration fee is ₹600 per participant (₹2,400 for a full 4-member team). Fees are non-refundable.',
      displayOrder: 3,
      isActive: true,
    },
    {
      question: 'Can students from different colleges or departments form a team?',
      answer: 'Yes! Cross-college and cross-department teams are fully supported and encouraged.',
      displayOrder: 4,
      isActive: true,
    },
  ];

  for (const faq of faqsData) {
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question },
    });
    if (!existing) {
      await prisma.fAQ.create({ data: faq });
    }
  }

  // 5. Seed Development Admin User
  console.log('👤 Seeding Development Admin User...');
  const devAdminEmail = 'admin.dev@hacknex.in';
  let devUser = await prisma.user.findUnique({
    where: { email: devAdminEmail },
  });

  if (!devUser) {
    devUser = await prisma.user.create({
      data: {
        name: 'HackNEX Dev Administrator',
        email: devAdminEmail,
        emailVerified: true,
      },
    });
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: { userId: devUser.id },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        userId: devUser.id,
        isActive: true,
      },
    });
  }

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Database seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
