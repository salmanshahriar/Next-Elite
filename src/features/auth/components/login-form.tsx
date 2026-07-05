'use client';

import TextLink from '@/components/shared/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DemoCredentials,
  isDemoMode,
  signInWithDemoFallback,
  type DemoAccount,
} from '../demo';
import { useAuth } from '../hooks/auth-provider';
import { loginSchema, type LoginInput } from '../schemas/login';

const LoginForm = () => {
  const t = useTranslations('auth.login');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { signIn, signUp, user, isLoading, signInWithGoogle, isGoogleEnabled } =
    useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (!isLoading && user) router.replace('/dashboard');
  }, [user, isLoading, router]);

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      if (isDemoMode) {
        await signInWithDemoFallback(
          { signIn, signUp },
          values.email,
          values.password,
        );
      } else {
        await signIn(values.email, values.password);
      }
      router.replace('/dashboard');
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : t('invalidCredentials'),
      );
      form.setValue('password', '');
    }
  });

  const handleDemoSelect = (account: DemoAccount) => {
    form.reset({ email: account.email, password: account.password });
    form.clearErrors();
    setServerError(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div>{tCommon('loading')}</div>
      </div>
    );
  }

  if (user) return null;

  const emailError = form.formState.errors.email?.message;
  const passwordError = form.formState.errors.password?.message;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card flat className="w-full max-w-md pb-10">
        <CardHeader className="relative flex min-h-[3.5rem] flex-row items-center justify-center px-12">
          <Button
            variant="subtle"
            size="icon"
            className="absolute start-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
            onClick={() => router.push('/')}
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 transition-transform rtl:rotate-180" />
          </Button>
          <CardTitle className="text-center text-2xl">{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4 sm:gap-6"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="grid gap-4 sm:gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  tabIndex={1}
                  placeholder="email@example.com"
                  aria-invalid={!!emailError}
                  {...form.register('email')}
                />
                <InputError message={emailError} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{t('password')}</Label>
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  tabIndex={2}
                  placeholder={t('passwordPlaceholder')}
                  aria-invalid={!!passwordError}
                  {...form.register('password')}
                />
                <InputError message={passwordError} />
              </div>

              {serverError && (
                <p className="text-sm text-destructive" role="alert">
                  {serverError}
                </p>
              )}

              <TextLink
                href="/password-reset"
                className="ml-auto text-xs text-primary sm:text-sm"
                tabIndex={4}
              >
                {t('forgotPassword')}
              </TextLink>

              <Button
                type="submit"
                tabIndex={3}
                loading={form.formState.isSubmitting}
              >
                {t('submit')}
              </Button>

              {isGoogleEnabled && (
                <>
                  <div className="relative my-2">
                    <span className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </span>
                    <span className="relative flex justify-center text-xs text-muted-foreground uppercase">
                      {t('orContinueWith')}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => signInWithGoogle()}
                    loading={form.formState.isSubmitting}
                  >
                    {t('signInWithGoogle')}
                  </Button>
                </>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('noAccount')}{' '}
            <TextLink href="/register" className="text-primary">
              {t('signUp')}
            </TextLink>
          </p>

          {isDemoMode && <DemoCredentials onSelect={handleDemoSelect} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
