/// <reference types="vite/client" />
import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (dsn && dsn !== 'https://placeholder@o0.ingest.sentry.io/0') {
    Sentry.init({
      dsn,
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 0.2,
    });
  }
}
