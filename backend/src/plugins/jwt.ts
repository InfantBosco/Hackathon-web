import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { settings } from '../config/settings.js';

export const jwtPlugin = fp(async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: settings.JWT_SECRET,
    sign: {
      expiresIn: settings.JWT_EXPIRES_IN,
    },
  });
});
