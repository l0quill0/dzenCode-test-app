'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, UserCheck } from 'lucide-react';
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
    <div className="mt-4 flex flex-col gap-3 rounded-md border border-[#cfd8dc] bg-white p-6">
      <div className="flex items-center gap-2 text-[14px] font-semibold text-[#546e7a]">
        <UserCheck className="h-4 w-4 text-[#8bc34a]" />
        <span>{t.settings.accountLabel}</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-[#2c3c44]">
            {user.name}
          </span>
          <span className="text-[13px] text-[#78909c]">{user.email}</span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-[#ffcdd2] bg-[#ffebee] px-4 py-2 text-[13px] font-semibold text-[#d32f2f] transition-colors hover:bg-[#ffcdd2]"
        >
          <LogOut className="h-4 w-4" />
          <span>{t.auth.logout}</span>
        </button>
      </div>
    </div>
  );
}
