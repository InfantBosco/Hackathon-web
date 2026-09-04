import Fastify from 'fastify';
import { loggerOptions } from './core/logger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { corsPlugin } from './plugins/cors.js';
import { rateLimitPlugin } from './plugins/rateLimit.js';
import { swaggerPlugin } from './plugins/swagger.js';
import { prismaPlugin } from './plugins/prisma.js';
import { jwtPlugin } from './plugins/jwt.js';
import { authenticate, requireAdmin } from './middleware/auth.middleware.js';
import { registerApiRoutes } from './routes/index.js';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: typeof authenticate;
    requireAdmin: typeof requireAdmin;
  }
}

export function buildApp() {
  const app = Fastify({
    logger: loggerOptions,
    trustProxy: true,
  });

  // Set central error and not-found handlers
  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  // Register plugins
  app.register(corsPlugin);
  app.register(rateLimitPlugin);
  app.register(swaggerPlugin);
  app.register(prismaPlugin);
  app.register(jwtPlugin);

  // Decorate fastify instance with auth middleware helpers
  app.decorate('authenticate', authenticate);
  app.decorate('requireAdmin', requireAdmin);

  // Register API Routes
  app.register(registerApiRoutes);

  return app;
}
