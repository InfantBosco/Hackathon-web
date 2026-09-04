import { buildApp } from './app.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const HOST = process.env.HOST || '0.0.0.0';

const app = buildApp();

async function start() {
  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`HackNEX Backend API running on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
