import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function registrationsRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['Registrations'],
      summary: 'Create team registration (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Registrations module skeleton initialized.' }));
  });
}
