import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { TeamService } from '../../services/team.service.js';
import { formatSuccessResponse } from '../../core/response.js';
import { FoodPreference } from '@prisma/client';

const createTeamSchema = z.object({
  captainUserId: z.string().uuid(),
  teamName: z.string().min(2).max(100),
  captainDetails: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    college: z.string().min(2),
    department: z.string().min(2),
    yearOfStudy: z.string(),
    linkedinUrl: z.string().url().optional(),
    foodPreference: z.nativeEnum(FoodPreference),
  }),
});

export async function teamsRoutes(fastify: FastifyInstance) {
  const teamService = new TeamService(fastify.prisma);

  // POST /api/v1/teams - Create Team & Captain Participant
  fastify.post('/', {
    schema: {
      tags: ['Teams'],
      summary: 'Create a new team with Captain participant',
    },
  }, async (request, reply) => {
    const input = createTeamSchema.parse(request.body);
    const team = await teamService.createTeam(input);
    return reply.status(201).send(formatSuccessResponse(team));
  });

  // GET /api/v1/teams/:id - Get Team details
  fastify.get('/:id', {
    schema: {
      tags: ['Teams'],
      summary: 'Get team details and members',
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const team = await teamService.getTeamById(id);
    return reply.send(formatSuccessResponse(team));
  });
}
