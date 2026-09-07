import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Starting database cleanup (preserving Admin accounts & content baseline)...');

  // 1. Get Admin User IDs
  const admins = await prisma.admin.findMany({ select: { userId: true } });
  const adminUserIds = admins.map((a) => a.userId);

  // 2. Delete User Data & Registration Records
  const deletedPayments = await prisma.payment.deleteMany({});
  console.log(`- Deleted ${deletedPayments.count} payment records`);

  const deletedRegistrations = await prisma.registration.deleteMany({});
  console.log(`- Deleted ${deletedRegistrations.count} registration records`);

  const deletedParticipants = await prisma.participant.deleteMany({});
  console.log(`- Deleted ${deletedParticipants.count} participant records`);

  const deletedTeams = await prisma.team.deleteMany({});
  console.log(`- Deleted ${deletedTeams.count} team records`);

  const deletedVerifications = await prisma.verification.deleteMany({});
  console.log(`- Deleted ${deletedVerifications.count} verification records`);

  // 3. Delete Non-Admin User Sessions, Accounts & Users
  const deletedSessions = await prisma.session.deleteMany({
    where: { userId: { notIn: adminUserIds } },
  });
  console.log(`- Deleted ${deletedSessions.count} non-admin session records`);

  const deletedAccounts = await prisma.account.deleteMany({
    where: { userId: { notIn: adminUserIds } },
  });
  console.log(`- Deleted ${deletedAccounts.count} non-admin account records`);

  const deletedUsers = await prisma.user.deleteMany({
    where: { id: { notIn: adminUserIds } },
  });
  console.log(`- Deleted ${deletedUsers.count} non-admin user records`);

  // 4. Ensure Baseline Dev Admin Exists
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
    console.log(`+ Created Dev Admin User: ${devAdminEmail}`);
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
    console.log(`+ Designated Dev Admin role for user ID: ${devUser.id}`);
  }

  console.log('✅ Database cleanup completed successfully! Admin user preserved.');
}

main()
  .catch((e) => {
    console.error('❌ Error cleaning database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
