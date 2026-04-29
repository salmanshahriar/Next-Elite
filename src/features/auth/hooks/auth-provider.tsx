'use client';

import { env } from '@/libs/env';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { authClient } from '../lib/auth-client';
import { hasPermission } from '../rbac/can';
import { getPermissionsForRole, getRoleFromEmail } from '../rbac/roles';
import type { AuthPermission, AuthUser } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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

export interface AuthProviderProps {
  children: ReactNode;
  initialUser?: AuthUser | null;
}

export function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = useMemo<AuthUser | null>(() => {
    if (!session?.user?.email) return initialUser;
    const role = getRoleFromEmail(
      session.user.email,
      env.NEXT_PUBLIC_AUTH_ADMIN_EMAILS,
    );
    return {
      id: session.user.id ?? session.user.email,
      email: session.user.email,
      role,
      permissions: getPermissionsForRole(role),
    };
  }, [session, initialUser]);

  const signIn = useCallback(async (email: string, password: string) => {
    const result = await authClient.signIn.email({ email, password });
    if (result.error) {
      throw new Error(result.error.message ?? 'Invalid credentials');
    }
  }, []);

  const signUp = useCallback(
    async (input: { email: string; password: string; name?: string }) => {
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
    await authClient.signOut();
    router.replace('/login');
    router.refresh();
  }, [router]);

  const signInWithGoogle = useCallback(async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/login',
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading: isPending,
      isAuthenticated: !!user,
      isGoogleEnabled: env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      hasPermission: (permission) =>
        hasPermission(user?.permissions, permission),
    }),
    [user, isPending, signIn, signUp, signOut, signInWithGoogle],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
