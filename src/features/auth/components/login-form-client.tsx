'use client';

import TextLink from '@/components/common/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { useAuth } from '@/features/auth/hooks/auth-context';
import type { Messages } from '@/features/i18n/config/get-translations';
import { t } from '@/features/i18n/config/get-translations';
import { loginInputSchema } from '@/lib/validation/auth';
import { Check, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

export default function LoginFormClient({ messages }: { messages: Messages }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const router = useRouter();
  const { login, user, isLoading, signInWithGoogle, isGoogleEnabled } =
    useAuth();

  const copyToClipboard = async (
    text: string,
    itemId: string,
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    const parsed = loginInputSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(t(messages, 'auth.login.fillAllFields'));
      setIsLoggingIn(false);
      return;
    }

    try {
      await login(parsed.data.email, parsed.data.password);
      router.replace('/dashboard');
    } catch {
      setError(t(messages, 'auth.login.invalidCredentials'));
      setPassword('');
      setIsLoggingIn(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div>{t(messages, 'common.loading')}</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t(messages, 'auth.login.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4 sm:gap-6"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t(messages, 'auth.login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
                <InputError message={error && !password ? error : ''} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  {t(messages, 'auth.login.password')}
                </Label>
                <PasswordInput
                  id="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t(messages, 'auth.login.passwordPlaceholder')}
                />
                <InputError message={error && password ? error : ''} />
              </div>
              <TextLink
                href="/password-reset"
                className="ml-auto text-xs text-primary sm:text-sm"
                tabIndex={4}
              >
                {t(messages, 'auth.login.forgotPassword')}
              </TextLink>
              <Button type="submit" tabIndex={3} disabled={isLoggingIn}>
                {t(messages, 'auth.login.submit')}
              </Button>
              {isGoogleEnabled && (
                <>
                  <div className="relative my-2">
                    <span className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </span>
                    <span className="relative flex justify-center text-xs text-muted-foreground uppercase">
                      {t(messages, 'auth.login.orContinueWith')}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => signInWithGoogle()}
                    disabled={isLoggingIn}
                  >
                    {t(messages, 'auth.login.signInWithGoogle')}
                  </Button>
                </>
              )}
            </div>
          </form>
          <div className="mt-4 max-w-md space-y-2 rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">Test Credentials:</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-around">
                <p className="font-semibold">Admin:</p>
                <div className="flex items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <code className="ml-1 rounded border bg-background px-2 py-0.5">
                    admin@test.com
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard('admin@test.com', 'admin-email')
                    }
                    className="ml-2 rounded p-1 transition-colors hover:bg-accent"
                    title="Copy to clipboard"
                  >
                    {copiedItem === 'admin-email' ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
