import { describe, it, expect } from 'vitest';
import { settings } from '../src/config/settings.js';

describe('Configuration Settings', () => {
  it('should load default environment configuration values correctly', () => {
    expect(settings.APP_NAME).toBeDefined();
    expect(settings.PORT).toBeTypeOf('number');
    expect(settings.HOST).toBeTypeOf('string');
    expect(Array.isArray(settings.CORS_ORIGINS)).toBe(true);
  });
});
