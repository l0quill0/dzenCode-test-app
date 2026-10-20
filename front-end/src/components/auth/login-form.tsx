'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { Shield } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/common/button';
import { ErrorMessage } from '@/components/common/error-message';
import { TextInput } from '@/components/common/form/text-input';
import { useI18n } from '@/contexts/i18n-context';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearAuthError, loginUser } from '@/store/slices/auth-slice';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.auth.error);
  const router = useRouter();
  const { t } = useI18n();

  const loginSchema = z.object({
    email: z.email(t.auth.invalidEmail),
    password: z.string().min(6, t.auth.passwordMin),
  });

  const form = useForm({
    defaultValues: {
      email: 'alex@dzencode.com',
      password: 'password123',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      dispatch(clearAuthError());
      const resultAction = await dispatch(
        loginUser({
          email: value.email.trim(),
          password: value.password,
        }),
      );

      if (loginUser.fulfilled.match(resultAction)) {
        router.refresh();
      }
    },
  });

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="animate__animated animate__fadeIn w-full max-w-[420px] rounded-lg border border-line bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-[20px] font-bold text-ink">
            {t.auth.signIn}
          </h1>
          <p className="text-[12px] text-ink-muted">{t.auth.demoHint}</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="flex flex-col gap-4"
          noValidate
        >
          <form.Field name="email">
            {(field) => (
              <TextInput
                type="email"
                autoComplete="email"
                label={t.auth.email}
                field={field}
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <TextInput
                type="password"
                autoComplete="current-password"
                label={t.auth.password}
                field={field}
              />
            )}
          </form.Field>

          <ErrorMessage
            message={authError ? t.auth.invalidCredentials : null}
          />

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="mt-2 w-full"
              >
                {t.actions.login}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
