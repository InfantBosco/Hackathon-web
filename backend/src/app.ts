import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // Register CORS
  app.register(cors, {
    origin: true,
    credentials: true,
  });

  // Health check endpoint
  app.get('/health', async () => {
    return {
      status: 'ok',
      service: 'HackNEX API Backend',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  });

  // API Base Route
  app.get('/api', async () => {
    return {
      message: 'HackNEX 2026 API Server Initialized',
      status: 'READY_FOR_IMPLEMENTATION',
    };
  });

  return app;
}
