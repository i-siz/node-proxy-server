import { sentryInitiator } from '../../logging/sentry-initiator';
import { Express } from 'express';

describe('sentry initiator', () => {
  it('sentry should be initialized', () => {
    const app = {} as unknown as Express;
    const sentry = sentryInitiator(app);
    expect(sentry.isInitialized()).toBe(true);
  });
});
