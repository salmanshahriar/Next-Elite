'use client';

import NextTopLoader from 'nextjs-toploader';
import { useEffect, useState } from 'react';

export function TopLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextTopLoader
      color="var(--primary)"
      showSpinner={false}
      height={3}
      crawl
      easing="ease"
      speed={200}
      crawlSpeed={200}
      shadow="0 0 10px var(--primary), 0 0 5px var(--primary)"
      zIndex={1600}
    />
  );
}
