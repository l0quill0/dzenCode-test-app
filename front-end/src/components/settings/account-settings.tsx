'use client';

import { useRouter } from 'next/navigation';
import { LogOut, UserCheck } from 'lucide-react';
import { Button } from '@/components/common/button';
import { useI18n } from '@/contexts/i18n-context';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/auth-slice';

export function AccountSettings() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const { t } = useI18n();

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    router.refresh();
  };

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-md border border-line bg-white p-6">
      <div className="flex items-center gap-2 text-[14px] font-semibold text-ink-soft">
        <UserCheck className="h-4 w-4 text-brand" />
        <span>{t.settings.accountLabel}</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-ink">
            {user.name}
          </span>
          <span className="text-[13px] text-ink-muted">{user.email}</span>
        </div>

        <Button
          variant="danger-outline"
          shape="rounded"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>{t.auth.logout}</span>
        </Button>
      </div>
    </div>
  );
}
