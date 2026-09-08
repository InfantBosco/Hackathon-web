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
    if (process.env.NODE_ENV !== 'test') {
      const connectPromise = prisma.$connect();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Prisma connection timeout')), 3000)
      );
      await Promise.race([connectPromise, timeoutPromise]);
      fastify.log.info('Prisma connected to database successfully');
    }
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
