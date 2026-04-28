'use client';

import { publicEnv } from '@/core/env';
import { authClient } from '@/features/auth/lib/auth-client';
import type {
  AuthContext as AuthContextType,
  AuthUser,
} from '@/features/auth/types/types';
import {
  getRoleFromEmail,
  sessionUserToAuthUser,
} from '@/features/auth/utils/auth-user';
import {
  can,
  getPermissionsForRole,
  hasPermission,
} from '@/features/auth/utils/authorization';
import { authUserSchema } from '@/lib/validation/auth';
import { useRouter } from 'next/navigation';
import type React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function subscribeToStoredUser(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === 'user') {
      onStoreChange();
    }
  };

  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}

function getStoredUserSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('user');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const storedDemoUserSnapshot = useSyncExternalStore(
    subscribeToStoredUser,
    getStoredUserSnapshot,
    () => null,
  );
  const [demoUser, setDemoUser] = useState<AuthUser | null>(null);
  const router = useRouter();
  const storedDemoUser = useMemo(() => {
    if (!storedDemoUserSnapshot) {
      return null;
    }

    try {
      const parsed = JSON.parse(storedDemoUserSnapshot);
      const parsedUser = authUserSchema.safeParse(parsed);
      if (!parsedUser.success) {
        window.localStorage.removeItem('user');
        return null;
      }
      return parsedUser.data;
    } catch {
      window.localStorage.removeItem('user');
      return null;
    }
  }, [storedDemoUserSnapshot]);

  const sessionUser =
    session &&
    typeof session === 'object' &&
    'user' in session &&
    typeof session.user === 'object' &&
    session.user
      ? (session.user as { id?: string; email?: string | null })
      : null;

  const userFromSession = sessionUser
    ? sessionUserToAuthUser({
        id: sessionUser.id ?? sessionUser.email ?? undefined,
        email: sessionUser.email ?? undefined,
        role: getRoleFromEmail(
          sessionUser.email,
          publicEnv.NEXT_PUBLIC_AUTH_ADMIN_EMAILS,
        ),
      })
    : null;

  const user = userFromSession ?? demoUser ?? storedDemoUser;
  const isLoading = isPending;

  const login = useCallback(async (email: string, password: string) => {
    let role: 'admin' | 'user' | null = null;
    if (email === 'admin@test.com' && password === '12345') {
      role = 'admin';
    } else if (email === 'user@test.com' && password === '12345') {
      role = 'user';
    } else {
      throw new Error('Invalid credentials');
    }
    const mockUser: AuthUser = {
      id: 'user-' + Date.now(),
      email,
      role,
      permissions: getPermissionsForRole(role),
    };
    setDemoUser(mockUser);
    window.localStorage.setItem('user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setDemoUser(null);
    window.localStorage.removeItem('user');
    if (sessionUser) {
      void authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace('/login');
            router.refresh();
          },
        },
      });
    } else {
      router.replace('/login');
      router.refresh();
    }
  }, [router, sessionUser]);

  const signInWithGoogle = useCallback(async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
      errorCallbackURL: '/login',
    });
  }, []);

  const isGoogleEnabled = publicEnv.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        signInWithGoogle,
        isAuthenticated: !!user,
        isGoogleEnabled,
        hasPermission: (permission) =>
          hasPermission(user?.permissions, permission),
        can: (action, resource) =>
          can(user?.id, user?.permissions, action, resource),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
