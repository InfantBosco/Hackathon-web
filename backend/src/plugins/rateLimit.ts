import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import { settings } from '../config/settings.js';

export const rateLimitPlugin = fp(async (fastify) => {
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    allowList: settings.NODE_ENV === 'development' ? ['127.0.0.1', 'localhost'] : [],
    addHeadersOnExceeding: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },
  });
});
