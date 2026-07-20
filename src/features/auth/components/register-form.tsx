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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/auth-provider';
import { registerSchema, type RegisterInput } from '../schemas/register';

const RegisterForm = () => {
  const t = useTranslations('auth.register');
  const tLogin = useTranslations('auth.login');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { signUp, user, isLoading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      await signUp({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      router.replace('/dashboard');
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : t('signUpFailed'),
      );
    }
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <div>{tCommon('loading')}</div>
      </div>
    );
  }

  if (user) return null;

  const errors = form.formState.errors;

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
                <Label htmlFor="name">{t('name')}</Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  placeholder={t('namePlaceholder')}
                  aria-invalid={!!errors.name}
                  {...form.register('name')}
                />
                <InputError message={errors.name?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">{tLogin('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@example.com"
                  aria-invalid={!!errors.email}
                  {...form.register('email')}
                />
                <InputError message={errors.email?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{tLogin('password')}</Label>
                <PasswordInput
                  id="password"
                  autoComplete="new-password"
                  placeholder={t('passwordPlaceholder')}
                  aria-invalid={!!errors.password}
                  {...form.register('password')}
                />
                <InputError message={errors.password?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <PasswordInput
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder={t('confirmPasswordPlaceholder')}
                  aria-invalid={!!errors.confirmPassword}
                  {...form.register('confirmPassword')}
                />
                <InputError message={errors.confirmPassword?.message} />
              </div>

              {serverError && (
                <p className="text-sm text-destructive" role="alert">
                  {serverError}
                </p>
              )}

              <Button type="submit" loading={form.formState.isSubmitting}>
                {t('submit')}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('haveAccount')}{' '}
            <TextLink href="/login" className="text-primary">
              {tLogin('title')}
            </TextLink>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
