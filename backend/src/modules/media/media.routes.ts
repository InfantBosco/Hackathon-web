import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function mediaRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Media'],
      summary: 'Get public media gallery items (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Media module skeleton initialized.' }));
  });
}
