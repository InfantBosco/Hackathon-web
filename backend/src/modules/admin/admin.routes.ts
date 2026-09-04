import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.get('/dashboard', {
    schema: {
      tags: ['Admin'],
      summary: 'Get admin dashboard metrics (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Admin module skeleton initialized.' }));
  });
}
