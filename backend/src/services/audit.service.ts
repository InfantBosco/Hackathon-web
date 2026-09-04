import { PrismaClient, AuditLog } from '@prisma/client';
import { Prisma } from '@prisma/client';

export interface CreateAuditLogInput {
  adminId: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

export class AuditService {
  constructor(private prisma: PrismaClient) {}

  public async logAction(input: CreateAuditLogInput): Promise<AuditLog> {
    return this.prisma.auditLog.create({
      data: {
        adminId: input.adminId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId || null,
        metadata: input.metadata ? (input.metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
      },
    });
  }
}
