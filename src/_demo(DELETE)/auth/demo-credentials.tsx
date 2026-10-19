'use client';

import { useTranslations } from 'next-intl';
import { DEMO_ACCOUNTS, type DemoAccount } from './accounts';

interface DemoCredentialsProps {
  onSelect: (account: DemoAccount) => void;
}

const DemoCredentials = ({ onSelect }: DemoCredentialsProps) => {
  const t = useTranslations('auth.login');

  return (
    <div className="mt-4 max-w-md rounded-xl border bg-card p-4 shadow-sm">
      <p className="mb-4 text-sm text-muted-foreground">{t('clickToFill')}</p>
      <div className="space-y-2 text-sm">
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.label}
            type="button"
            onClick={() => onSelect(account)}
            className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted"
          >
            <span className="w-1/4 text-left font-medium">{account.label}</span>
            <span className="w-1/2 text-left">{account.email}</span>
            <span className="w-1/4 text-right">{account.password}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoCredentials;
