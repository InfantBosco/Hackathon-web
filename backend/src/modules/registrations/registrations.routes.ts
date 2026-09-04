import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { TeamService } from '../../services/team.service.js';
import { RegistrationService } from '../../services/registration.service.js';
import { formatSuccessResponse } from '../../core/response.js';

const submitRegistrationSchema = z.object({
  teamId: z.string().uuid(),
  requesterUserId: z.string().uuid(),
});

export async function registrationsRoutes(fastify: FastifyInstance) {
  const teamService = new TeamService(fastify.prisma);
  const registrationService = new RegistrationService(fastify.prisma, teamService);

  // POST /api/v1/registrations - Submit team for registration (Requires exactly 4 members)
  fastify.post('/', {
    schema: {
      tags: ['Registrations'],
      summary: 'Submit team registration (Transition to READY_FOR_PAYMENT)',
    },
  }, async (request, reply) => {
    const { teamId, requesterUserId } = submitRegistrationSchema.parse(request.body);
    const registration = await registrationService.createOrSubmitRegistration(teamId, requesterUserId);
    return reply.status(201).send(formatSuccessResponse(registration));
  });

  // GET /api/v1/registrations/user/:userId - Get registration summary by captain user ID
  fastify.get('/user/:userId', {
    schema: {
      tags: ['Registrations'],
      summary: 'Get active team registration summary for captain user ID',
    },
  }, async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const summary = await registrationService.getRegistrationByUserId(userId);
    return reply.send(formatSuccessResponse(summary));
  });

  // GET /api/v1/registrations/:id - Get registration summary
  fastify.get('/:id', {
    schema: {
      tags: ['Registrations'],
      summary: 'Get registration summary by registration ID',
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { requesterUserId } = request.query as { requesterUserId: string };
    const summary = await registrationService.getRegistrationSummary(id, requesterUserId);
    return reply.send(formatSuccessResponse(summary));
  });
}
