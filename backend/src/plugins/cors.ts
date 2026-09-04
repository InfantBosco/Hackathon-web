import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { settings } from '../config/settings.js';

export const corsPlugin = fp(async (fastify) => {
  await fastify.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return cb(null, true);

      if (settings.NODE_ENV === 'development' || settings.CORS_ORIGINS.includes(origin) || settings.CORS_ORIGINS.includes('*')) {
        return cb(null, true);
      }

      return cb(new Error('CORS origin unauthorized'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Idempotency-Key'],
  });
});
