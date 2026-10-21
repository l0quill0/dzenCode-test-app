'use client';

import type { ReactNode } from 'react';
import { Trash2, X } from 'lucide-react';
import { Button } from '@/components/common/button';
import { useI18n } from '@/contexts/i18n-context';

export interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

export function DeleteModal({
  isOpen,
  title,
  isDeleting = false,
  onCancel,
  onConfirm,
  children,
}: DeleteModalProps) {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onCancel}
    >
      <div
        className="animate__animated animate__fadeInDown animate__faster relative w-full max-w-[640px] rounded-[4px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="secondary"
          shape="circle"
          size="icon-md"
          onClick={onCancel}
          aria-label={t.actions.close}
          className="absolute -top-4 -right-4 border-line-soft text-ink-muted shadow-md hover:bg-white"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </Button>

        <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-5">
          <h2 className="text-[17px] sm:text-[18px] font-bold text-ink">{title}</h2>
          {children && (
            <div className="mt-5 max-h-[320px] overflow-y-auto border-t border-line-soft pt-4 pr-1">
              {children}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 sm:gap-4 rounded-b-[4px] bg-brand px-5 sm:px-8 py-4 sm:py-5">
          <Button variant="ghost" onClick={onCancel} disabled={isDeleting}>
            {t.actions.cancel}
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
            {!isDeleting && <Trash2 className="h-4 w-4" />}
            <span>{t.actions.delete}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
