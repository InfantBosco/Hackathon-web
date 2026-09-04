import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function teamsRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    schema: {
      tags: ['Teams'],
      summary: 'Get teams list (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Teams module skeleton initialized.' }));
  });
}
