import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function paymentsRoutes(fastify: FastifyInstance) {
  fastify.post('/create', {
    schema: {
      tags: ['Payments'],
      summary: 'Initiate payment (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Payments module skeleton initialized.' }));
  });

  fastify.post('/webhook/karunya', {
    schema: {
      tags: ['Payments'],
      summary: 'Karunya payment webhook callback (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.status(501).send(formatSuccessResponse({ message: 'Karunya payment webhook skeleton initialized.' }));
  });
}
