import 'server-only';

import { env } from '@/libs/env';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit: Ratelimit | null = null;

function getRedis(): Redis | null {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export function getRateLimiter(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  const redis = getRedis();
  if (!redis) return null;
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'),
    analytics: true,
    prefix: 'rl',
  });
  return ratelimit;
}

export async function isRateLimited(identifier: string): Promise<boolean> {
  const limiter = getRateLimiter();
  if (!limiter) return false;
  const { success } = await limiter.limit(identifier);
  return !success;
}
