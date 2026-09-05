if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://user:password@localhost:5432/hacknex?schema=public';
}
if (!process.env.DIRECT_URL) {
  process.env.DIRECT_URL = 'postgresql://user:password@localhost:5432/hacknex?schema=public';
}

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

import { PrismaClient } from '@prisma/client';
import { seedAdmins } from './seed-admin.js';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log('🧹 Starting database cleanup (preserving Admin accounts)...');

  // Delete dependent transactional data
  const deletedPayments = await prisma.payment.deleteMany({});
  console.log(`Deleted ${deletedPayments.count} payments.`);

  const deletedRegistrations = await prisma.registration.deleteMany({});
  console.log(`Deleted ${deletedRegistrations.count} registrations.`);

  const deletedParticipants = await prisma.participant.deleteMany({});
  console.log(`Deleted ${deletedParticipants.count} participants.`);

  const deletedTeams = await prisma.team.deleteMany({});
  console.log(`Deleted ${deletedTeams.count} teams.`);

  const deletedSessions = await prisma.session.deleteMany({});
  console.log(`Deleted ${deletedSessions.count} sessions.`);

  const deletedVerifications = await prisma.verification.deleteMany({});
  console.log(`Deleted ${deletedVerifications.count} verifications.`);

  const deletedAuditLogs = await prisma.auditLog.deleteMany({});
  console.log(`Deleted ${deletedAuditLogs.count} audit logs.`);

  // Delete all non-admin users (Cascade deletes non-admin Accounts)
  const deletedNonAdminUsers = await prisma.user.deleteMany({
    where: {
      admin: null,
    },
  });
  console.log(`Deleted ${deletedNonAdminUsers.count} non-admin user accounts.`);

  // Re-run admin seed to ensure all 15 admins are intact
  console.log('\nRefreshing admin accounts...');
  const count = await seedAdmins(prisma);
  console.log(`✅ Cleanup complete. ${count} admin accounts preserved/active.`);
}

cleanDatabase()
  .catch((err) => {
    console.error('❌ Database cleanup failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
