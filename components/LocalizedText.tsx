'use client';

import { useTranslation } from 'react-i18next';

type LocalizedTextProps = {
  k: string;
  fallback?: string;
  values?: Record<string, unknown>;
  className?: string;
};

export default function LocalizedText({ k, fallback, values, className }: LocalizedTextProps) {
  const { t } = useTranslation();
  const value = t(k, { defaultValue: fallback || k, ...(values || {}) });
  return className ? <span className={className}>{value}</span> : <>{value}</>;
}
