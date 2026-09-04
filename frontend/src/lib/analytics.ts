import { track } from '@vercel/analytics';

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  try {
    track(name, properties);
  } catch (error) {
    console.debug('[Analytics] Event tracking error:', error);
  }
}
