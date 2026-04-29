import type { routing } from '@/features/i18n/routing';
import type messages from '../messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing)['locales'][number];
    Messages: typeof messages;
  }
}
