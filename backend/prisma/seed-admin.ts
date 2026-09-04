if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://user:password@localhost:5432/hacknex?schema=public';
}
if (!process.env.DIRECT_URL) {
  process.env.DIRECT_URL = 'postgresql://user:password@localhost:5432/hacknex?schema=public';
}

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

import { settings } from '../src/config/settings.js';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/crypto.js';
import { normalizeEmail, trimString } from '../src/utils/normalization.js';

export interface AdminCsvRecord {
  name: string;
  password: string;
  designation: string;
}

export function parseAndValidateAdminCsv(csvContent: string): AdminCsvRecord[] {
  const lines = csvContent
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    throw new Error('Admin CSV validation error: File is empty.');
  }

  // Validate Header
  const header = lines[0].split(',').map((h) => trimString(h).toLowerCase());
  if (!header.includes('name') || !header.includes('password') || !header.includes('designation')) {
    throw new Error('Admin CSV validation error: Missing required headers (Name, Password, Designation).');
  }

  const nameIdx = header.indexOf('name');
  const passIdx = header.indexOf('password');
  const desigIdx = header.indexOf('designation');

  const records: AdminCsvRecord[] = [];
  const seenNames = new Set<string>();

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',').map((p) => trimString(p));
    if (parts.length < 3) continue;

    const name = parts[nameIdx];
    const password = parts[passIdx];
    const designation = parts[desigIdx];

    if (!name || !password || !designation) {
      throw new Error(`Admin CSV validation error at line ${i + 1}: Required fields missing.`);
    }

    const lowerName = name.toLowerCase();
    if (seenNames.has(lowerName)) {
      throw new Error(`Admin CSV validation error: Duplicate admin name '${name}' found at line ${i + 1}.`);
    }
    seenNames.add(lowerName);

    records.push({ name, password, designation });
  }

  if (records.length !== 15) {
    throw new Error(`Admin CSV validation error: Expected exactly 15 administrator records, but found ${records.length}.`);
  }

  return records;
}

export async function seedAdmins(prisma: PrismaClient, csvPath?: string): Promise<number> {
  console.log('🚀 Admin seed process started...');

  const targetPath = csvPath || path.resolve(__dirname, '../private/admin-data.csv');
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Admin CSV file not found at path: ${targetPath}`);
  }

  const csvContent = fs.readFileSync(targetPath, 'utf-8');
  const records = parseAndValidateAdminCsv(csvContent);
  console.log(`✅ Validated ${records.length} administrator records from confidential CSV.`);

  let seededCount = 0;

  for (const record of records) {
    const emailSlug = record.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const email = `${emailSlug}@hacknex.in`;

    await prisma.$transaction(async (tx) => {
      // 1. Check existing User
      let user = await tx.user.findFirst({
        where: {
          OR: [{ email }, { name: { equals: record.name, mode: 'insensitive' } }],
        },
      });

      const existingAccount = user
        ? await tx.account.findFirst({
            where: { userId: user.id },
          })
        : null;

      // Only hash password if account does not exist yet
      let passwordHash: string | undefined;
      if (!existingAccount) {
        passwordHash = await hashPassword(record.password);
      }

      if (!user) {
        user = await tx.user.create({
          data: {
            name: record.name,
            email,
            emailVerified: true,
          },
        });
      } else if (!user.emailVerified || user.name !== record.name) {
        user = await tx.user.update({
          where: { id: user.id },
          data: {
            name: record.name,
            emailVerified: true,
          },
        });
      }

      // 2. Create Account if missing
      if (!existingAccount) {
        await tx.account.create({
          data: {
            userId: user.id,
            accountId: user.id,
            providerId: 'credential',
            password: passwordHash!,
          },
        });
      }

      // 3. Create or update Admin role if missing
      const existingAdmin = await tx.admin.findUnique({
        where: { userId: user.id },
      });

      if (!existingAdmin) {
        await tx.admin.create({
          data: {
            userId: user.id,
            isActive: true,
          },
        });
      }
    });

    seededCount++;
  }

  console.log(`🎉 Successfully seeded ${seededCount} administrator accounts.`);
  return seededCount;
}

// Standalone execution wrapper
if (process.argv[1] && process.argv[1].includes('seed-admin')) {
  const prisma = new PrismaClient();
  seedAdmins(prisma)
    .catch((err) => {
      console.error('❌ Admin seed failed:', err.message);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
