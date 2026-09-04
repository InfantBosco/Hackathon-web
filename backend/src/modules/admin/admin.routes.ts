import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { AdminService } from '../../services/admin.service.js';
import { formatSuccessResponse } from '../../core/response.js';
import { TeamStatus, RegistrationStatus, PaymentStatus, FoodPreference } from '@prisma/client';

const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(10).optional(),
});

const listTeamsQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: z.nativeEnum(TeamStatus).optional(),
});

const listParticipantsQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  college: z.string().optional(),
  department: z.string().optional(),
  foodPreference: z.nativeEnum(FoodPreference).optional(),
  isCaptain: z.preprocess((val) => (val === 'true' ? true : val === 'false' ? false : val), z.boolean().optional()),
});

const listRegistrationsQuerySchema = paginationSchema.extend({
  status: z.nativeEnum(RegistrationStatus).optional(),
});

const listPaymentsQuerySchema = paginationSchema.extend({
  status: z.nativeEnum(PaymentStatus).optional(),
});

const idParamSchema = z.object({
  id: z.string().min(1, 'Resource ID is required'),
});

export async function adminRoutes(fastify: FastifyInstance) {
  const adminService = new AdminService(fastify.prisma);

  // Apply authentication & requireAdmin middleware to ALL admin routes
  fastify.addHook('preHandler', fastify.authenticate);
  fastify.addHook('preHandler', fastify.requireAdmin);

  // GET /api/v1/admin/dashboard - Admin Dashboard Metrics
  fastify.get('/dashboard', {
    schema: {
      tags: ['Admin'],
      summary: 'Get administrative metrics & statistics (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
    },
  }, async (_request, reply) => {
    const result = await adminService.getDashboardMetrics();
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/teams - List Teams (Paginated, Searchable, Filterable)
  fastify.get('/teams', {
    schema: {
      tags: ['Admin'],
      summary: 'List hackathon teams with pagination and filtering (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 10 },
          search: { type: 'string' },
          status: { type: 'string', enum: Object.values(TeamStatus) },
        },
      },
    },
  }, async (request, reply) => {
    const query = listTeamsQuerySchema.parse(request.query);
    const result = await adminService.listTeams(query);
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/teams/:id - Get Team Details
  fastify.get('/teams/:id', {
    schema: {
      tags: ['Admin'],
      summary: 'Get detailed team record by ID (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
  }, async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const result = await adminService.getTeamById(id);
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/participants - List Participants (Paginated, Searchable, Filterable)
  fastify.get('/participants', {
    schema: {
      tags: ['Admin'],
      summary: 'List participants with college/department/food filters (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 10 },
          search: { type: 'string' },
          college: { type: 'string' },
          department: { type: 'string' },
          foodPreference: { type: 'string', enum: Object.values(FoodPreference) },
          isCaptain: { type: 'boolean' },
        },
      },
    },
  }, async (request, reply) => {
    const query = listParticipantsQuerySchema.parse(request.query);
    const result = await adminService.listParticipants(query);
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/participants/:id - Get Participant Details
  fastify.get('/participants/:id', {
    schema: {
      tags: ['Admin'],
      summary: 'Get detailed participant record by ID (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
  }, async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const result = await adminService.getParticipantById(id);
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/registrations - List Registrations (Paginated, Filterable)
  fastify.get('/registrations', {
    schema: {
      tags: ['Admin'],
      summary: 'List registrations with status filtering (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 10 },
          status: { type: 'string', enum: Object.values(RegistrationStatus) },
        },
      },
    },
  }, async (request, reply) => {
    const query = listRegistrationsQuerySchema.parse(request.query);
    const result = await adminService.listRegistrations(query);
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/registrations/:id - Get Registration Details
  fastify.get('/registrations/:id', {
    schema: {
      tags: ['Admin'],
      summary: 'Get detailed registration record by ID (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
  }, async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const result = await adminService.getRegistrationById(id);
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/payments - List Payments (Paginated, Filterable)
  fastify.get('/payments', {
    schema: {
      tags: ['Admin'],
      summary: 'List payment status records (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', default: 1 },
          limit: { type: 'integer', default: 10 },
          status: { type: 'string', enum: Object.values(PaymentStatus) },
        },
      },
    },
  }, async (request, reply) => {
    const query = listPaymentsQuerySchema.parse(request.query);
    const result = await adminService.listPayments(query);
    return reply.send(formatSuccessResponse(result));
  });

  // GET /api/v1/admin/payments/:id - Get Payment Details
  fastify.get('/payments/:id', {
    schema: {
      tags: ['Admin'],
      summary: 'Get detailed payment record by ID (Requires ADMIN role)',
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
  }, async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    const result = await adminService.getPaymentById(id);
    return reply.send(formatSuccessResponse(result));
  });
}
