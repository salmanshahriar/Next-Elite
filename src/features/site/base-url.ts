import 'server-only';

import { env } from '@/libs/env';
import { siteConfig } from './config';

export const baseUrl: string =
  env.NEXT_PUBLIC_APP_URL?.trim() ||
  siteConfig.domain ||
  'https://yourdomain.com';
