'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { hasPermission } from '../rbac/can';
import type { AuthPermission, AuthUser } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  isGoogleEnabled: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  hasPermission: (permission: AuthPermission) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const loadAuthClient = async () =>
  (await import('../lib/auth-client')).authClient;

export interface AuthProviderProps {
  children: ReactNode;
  initialUser?: AuthUser | null;
  isGoogleEnabled?: boolean;
}

export function AuthProvider({
  children,
  initialUser = null,
  isGoogleEnabled = false,
}: AuthProviderProps) {
  const router = useRouter();
  const user = initialUser;

  const signIn = useCallback(async (email: string, password: string) => {
    const authClient = await loadAuthClient();
    const result = await authClient.signIn.email({ email, password });
    if (result.error) {
      throw new Error(result.error.message ?? 'Invalid credentials');
    }
  }, []);

  const signUp = useCallback(
    async (input: { email: string; password: string; name?: string }) => {
      const authClient = await loadAuthClient();
      const result = await authClient.signUp.email({
        email: input.email,
        password: input.password,
        name: input.name ?? input.email.split('@')[0] ?? input.email,
      });
      if (result.error) {
        throw new Error(result.error.message ?? 'Sign up failed');
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    const authClient = await loadAuthClient();
    await authClient.signOut();
    router.replace('/login');
    router.refresh();
  }, [router]);

  const signInWithGoogle = useCallback(async () => {
    const authClient = await loadAuthClient();
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/login',
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isGoogleEnabled,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      hasPermission: (permission) =>
        hasPermission(user?.permissions, permission),
    }),
    [user, isGoogleEnabled, signIn, signUp, signOut, signInWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
