import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../core/response.js';
import { settings } from '../config/settings.js';

export async function healthRoutes(fastify: FastifyInstance) {
  // Liveness check endpoint
  fastify.get('/health', {
    schema: {
      tags: ['System Health'],
      summary: 'Liveness check endpoint',
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                service: { type: 'string' },
                environment: { type: 'string' },
                timestamp: { type: 'string' },
                uptimeSeconds: { type: 'number' },
              },
            },
          },
        },
      },
    },
  }, async (_request, reply) => {
    return reply.send(
      formatSuccessResponse({
        status: 'healthy',
        service: settings.APP_NAME,
        environment: settings.NODE_ENV,
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor(process.uptime()),
      })
    );
  });

  // Readiness check endpoint
  fastify.get('/health/ready', {
    schema: {
      tags: ['System Health'],
      summary: 'Readiness check endpoint',
    },
  }, async (_request, reply) => {
    return reply.send(
      formatSuccessResponse({
        status: 'ready',
        databaseConnected: false, // Database connection check will be enabled in Phase 2
        servicesReady: true,
        timestamp: new Date().toISOString(),
      })
    );
  });
}
