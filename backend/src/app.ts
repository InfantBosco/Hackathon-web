import Fastify from 'fastify';
import { loggerOptions } from './core/logger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { corsPlugin } from './plugins/cors.js';
import { rateLimitPlugin } from './plugins/rateLimit.js';
import { swaggerPlugin } from './plugins/swagger.js';
import { registerApiRoutes } from './routes/index.js';

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

  // Register API Routes
  app.register(registerApiRoutes);

  return app;
}
