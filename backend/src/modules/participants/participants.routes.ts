import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { TeamService } from '../../services/team.service.js';
import { ParticipantService } from '../../services/participant.service.js';
import { formatSuccessResponse } from '../../core/response.js';
import { FoodPreference } from '@prisma/client';

const addParticipantSchema = z.object({
  requesterUserId: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  college: z.string().min(2),
  department: z.string().min(2),
  yearOfStudy: z.string(),
  linkedinUrl: z.string().url().optional(),
  foodPreference: z.nativeEnum(FoodPreference),
});

export async function participantsRoutes(fastify: FastifyInstance) {
  const teamService = new TeamService(fastify.prisma);
  const participantService = new ParticipantService(fastify.prisma, teamService);

  // POST /api/v1/teams/:teamId/participants - Add member to team
  fastify.post('/team/:teamId', {
    schema: {
      tags: ['Participants'],
      summary: 'Add participant member to team (Max 4)',
    },
  }, async (request, reply) => {
    const { teamId } = request.params as { teamId: string };
    const body = addParticipantSchema.parse(request.body);
    const participant = await participantService.addParticipant({
      teamId,
      ...body,
    });
    return reply.status(201).send(formatSuccessResponse(participant));
  });

  // DELETE /api/v1/participants/:id - Remove member from team
  fastify.delete('/:id', {
    schema: {
      tags: ['Participants'],
      summary: 'Remove participant from team',
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { requesterUserId } = request.query as { requesterUserId: string };
    await participantService.removeParticipant(id, requesterUserId);
    return reply.send(formatSuccessResponse({ message: 'Participant removed successfully' }));
  });
}
