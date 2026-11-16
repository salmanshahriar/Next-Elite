'use client';

import { Button } from '@/components/ui/button';
import { DocumentTitle } from '@/components/shared/document-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod/mini';

const schema = z.object({
  email: z.email('Enter a valid email'),
});

type FormValues = z.infer<typeof schema>;

export default function PasswordResetForm() {
  const t = useTranslations('auth.passwordReset');
  const [submitted, setSubmitted] = useState(false);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const emailErrorId = useId();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const emailError = form.formState.errors.email?.message;

  const onSubmit = form.handleSubmit(async () => {
    setSubmitted(true);
  });

  useEffect(() => {
    if (submitted) {
      statusRef.current?.focus();
    }
  }, [submitted]);

  return (
    <div className="flex w-full items-center justify-center py-4">
      <DocumentTitle title={t('title')} />
      <Card
        flat
        className="w-full max-w-md border-0 bg-transparent pb-10 shadow-none"
      >
        <CardHeader className="flex flex-row items-center justify-center px-4">
          <CardTitle as="h1" className="text-center text-2xl">
            {t('title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <p
              ref={statusRef}
              tabIndex={-1}
              role="status"
              className="text-sm text-muted-foreground outline-none"
            >
              {t('submitted')}
            </p>
          ) : (
            <form
              className="flex flex-col gap-4 sm:gap-6"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  autoFocus
                  required
                  placeholder="email@example.com"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? emailErrorId : undefined}
                  {...form.register('email')}
                />
                <InputError id={emailErrorId} message={emailError} />
              </div>

              <Button type="submit" loading={form.formState.isSubmitting}>
                {t('submit')}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
