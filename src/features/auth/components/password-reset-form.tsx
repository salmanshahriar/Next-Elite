'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type FormValues = z.infer<typeof schema>;

export default function PasswordResetForm() {
  const t = useTranslations('auth.passwordReset');
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  const emailError = form.formState.errors.email?.message;

  const onSubmit = form.handleSubmit(async () => {
    setSubmitted(true);
  });

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
          {submitted ? (
            <p className="text-sm text-muted-foreground">{t('submitted')}</p>
          ) : (
            <form className="flex flex-col gap-4 sm:gap-6" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  placeholder="email@example.com"
                  aria-invalid={!!emailError}
                  {...form.register('email')}
                />
                <InputError message={emailError} />
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
