import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/signup', {
    schema: {
      tags: ['Authentication'],
      summary: 'Register new user account (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Auth module skeleton initialized. Implementation in Phase 3.' }));
  });

  fastify.post('/login', {
    schema: {
      tags: ['Authentication'],
      summary: 'User login (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Auth module skeleton initialized. Implementation in Phase 3.' }));
  });
}
