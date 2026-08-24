'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/i18n';
import { ReactNode } from 'react';
import RuntimeLocalization from './RuntimeLocalization';

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}><RuntimeLocalization />{children}</I18nextProvider>;
}
