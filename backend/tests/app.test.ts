import { describe, it, expect } from 'vitest';
import { buildApp } from '../src/app.js';

describe('Backend Application Startup', () => {
  it('should instantiate the Fastify app cleanly without throwing errors', () => {
    const app = buildApp();
    expect(app).toBeDefined();
    expect(typeof app.listen).toBe('function');
    expect(typeof app.inject).toBe('function');
  });
});
