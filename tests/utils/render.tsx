import { AuthProvider } from '@/features/auth/hooks/auth-provider';
import type { AuthUser } from '@/features/auth/types';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement, ReactNode } from 'react';
import messages from '../../messages/en.json';

type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
  locale?: string;
  initialUser?: AuthUser | null;
};

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

export function renderWithProviders(
  ui: ReactElement,
  {
    locale = 'en',
    initialUser = null,
    ...options
  }: RenderWithProvidersOptions = {},
) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider defaultTheme="light">
          <QueryClientProvider client={queryClient}>
            <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
