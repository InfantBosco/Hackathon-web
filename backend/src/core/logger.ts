import { settings } from '../config/settings.js';

export const loggerOptions = {
  level: settings.NODE_ENV === 'production' ? 'info' : 'debug',
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'password',
      'token',
      'accessToken',
      'refreshToken',
      'apiKey',
      'secret',
    ],
    remove: true,
  },
};
