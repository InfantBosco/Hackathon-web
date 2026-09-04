import dns from 'dns';

try {
  dns.setDefaultResultOrder('ipv4first');
} catch {
  // Ignore if unsupported
}

import { buildApp } from './app.js';
import { settings } from './config/settings.js';

const app = buildApp();

async function start() {
  try {
    await app.listen({ port: settings.PORT, host: settings.HOST });
    app.log.info(`🚀 HackNEX Backend API running on http://${settings.HOST}:${settings.PORT}`);
    app.log.info(`📚 Interactive OpenAPI docs available at http://${settings.HOST}:${settings.PORT}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
