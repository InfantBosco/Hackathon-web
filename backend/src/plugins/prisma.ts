import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin = fp(async (fastify) => {
  const prisma = new PrismaClient({
    log: fastify.log.level === 'debug' ? ['query', 'info', 'warn', 'error'] : ['error'],
  });

  try {
    await prisma.$connect();
    fastify.log.info('Prisma connected to database successfully');
  } catch (err) {
    fastify.log.warn({ err }, 'Prisma database connection deferred or unavailable in current environment');
  }

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (server) => {
    try {
      await server.prisma.$disconnect();
    } catch {
      // Ignore disconnect error if client was not connected
    }
  });
});
