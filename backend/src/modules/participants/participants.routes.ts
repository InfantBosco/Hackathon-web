import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function participantsRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Participants'],
      summary: 'Get participants list (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Participants module skeleton initialized.' }));
  });
}
