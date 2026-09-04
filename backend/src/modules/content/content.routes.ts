import { FastifyInstance } from 'fastify';
import { formatSuccessResponse } from '../../core/response.js';

export async function contentRoutes(fastify: FastifyInstance) {
  fastify.get('/hackathon', {
    schema: {
      tags: ['Content'],
      summary: 'Get public hackathon information (Skeleton)',
    },
  }, async (_request, reply) => {
    return reply.send(
      formatSuccessResponse({
        name: 'HackNEX 2026',
        tagline: 'National Level Hackathon',
        organizer: 'NEXUS Club',
        institution: 'Karunya Institute of Technology and Sciences',
        dates: 'October 7–9, 2026',
        mode: 'Offline',
        teamSize: 4,
        registrationFee: 600,
      })
    );
  });
}
