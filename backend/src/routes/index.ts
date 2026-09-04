import { FastifyInstance } from 'fastify';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { teamsRoutes } from '../modules/teams/teams.routes.js';
import { participantsRoutes } from '../modules/participants/participants.routes.js';
import { registrationsRoutes } from '../modules/registrations/registrations.routes.js';
import { paymentsRoutes } from '../modules/payments/payments.routes.js';
import { mediaRoutes } from '../modules/media/media.routes.js';
import { contentRoutes } from '../modules/content/content.routes.js';
import { adminRoutes } from '../modules/admin/admin.routes.js';
import { healthRoutes } from './health.routes.js';

export async function registerApiRoutes(fastify: FastifyInstance) {
  // System Health Endpoints at root level
  await fastify.register(healthRoutes);

  // Versioned API Router (/api/v1)
  await fastify.register(async (v1) => {
    await v1.register(healthRoutes);
    await v1.register(authRoutes, { prefix: '/auth' });
    await v1.register(teamsRoutes, { prefix: '/teams' });
    await v1.register(participantsRoutes, { prefix: '/participants' });
    await v1.register(registrationsRoutes, { prefix: '/registrations' });
    await v1.register(paymentsRoutes, { prefix: '/payments' });
    await v1.register(mediaRoutes, { prefix: '/media' });
    await v1.register(contentRoutes, { prefix: '/content' });
    await v1.register(adminRoutes, { prefix: '/admin' });
  }, { prefix: '/api/v1' });
}
