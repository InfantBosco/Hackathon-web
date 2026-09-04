import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { TeamService } from '../../services/team.service.js';
import { PaymentService } from '../../services/payment.service.js';
import { formatSuccessResponse } from '../../core/response.js';

const initiatePaymentSchema = z.object({
  registrationId: z.string(),
  requesterUserId: z.string().uuid(),
  provider: z.string().optional(),
});

const verifyPaymentSchema = z.object({
  transactionId: z.string().min(3),
  providerReference: z.string().optional(),
});

export async function paymentsRoutes(fastify: FastifyInstance) {
  const teamService = new TeamService(fastify.prisma);
  const paymentService = new PaymentService(fastify.prisma, teamService);

  // POST /api/v1/payments/create - Initiate payment (calculates authoritative ₹2,400 fee for 4 members)
  fastify.post('/create', {
    schema: {
      tags: ['Payments'],
      summary: 'Initiate payment (calculates authoritative ₹2,400 total fee)',
    },
  }, async (request, reply) => {
    const input = initiatePaymentSchema.parse(request.body);
    const payment = await paymentService.initiatePayment(input);
    return reply.status(201).send(formatSuccessResponse(payment));
  });

  // POST /api/v1/payments/:id/verify - Verify payment transactionally
  fastify.post('/:id/verify', {
    schema: {
      tags: ['Payments'],
      summary: 'Verify payment transactionally and confirm registration',
    },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { transactionId, providerReference } = verifyPaymentSchema.parse(request.body);
    const result = await paymentService.verifyPaymentTransaction({
      paymentId: id,
      transactionId,
      providerReference,
    });
    return reply.send(formatSuccessResponse(result));
  });

  // POST /api/v1/payments/webhook/karunya - Karunya payment webhook callback
  fastify.post('/webhook/karunya', {
    schema: {
      tags: ['Payments'],
      summary: 'Karunya payment webhook callback endpoint',
    },
  }, async (request, reply) => {
    const body = request.body as { paymentId: string; transactionId: string; providerReference?: string };
    if (!body.paymentId || !body.transactionId) {
      return reply.status(400).send(formatSuccessResponse({ success: false, message: 'Missing paymentId or transactionId' }));
    }
    const result = await paymentService.verifyPaymentTransaction({
      paymentId: body.paymentId,
      transactionId: body.transactionId,
      providerReference: body.providerReference,
    });
    return reply.send(formatSuccessResponse({ message: 'Webhook processed successfully', data: result }));
  });
}
