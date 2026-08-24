'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { frenchToEnglish, localeTextMap } from './runtimeTranslations';

const normalize = (value: string) => value.replace(/\s+/g, ' ').trim();
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<HTMLElement, Map<string, string>>();
const translatableAttributes = ['placeholder', 'title', 'aria-label', 'alt'];

export default function RuntimeLocalization() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const translate = () => {
      const language = i18n.language?.startsWith('fr') ? 'fr' : 'en';
      document.documentElement.lang = language;
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let current: Node | null = walker.nextNode();
      while (current) {
        const parent = current.parentElement;
        if (parent && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) textNodes.push(current as Text);
        current = walker.nextNode();
      }
      textNodes.forEach((node) => {
        if (!originalText.has(node)) originalText.set(node, node.nodeValue || '');
        const original = originalText.get(node) || '';
        const source = normalize(original);
        const translated = language === 'fr' ? localeTextMap[source] : frenchToEnglish[source];
        if (translated) node.nodeValue = original.replace(source, translated);
      });

      document.querySelectorAll<HTMLElement>('*').forEach((node) => {
        let originals = originalAttributes.get(node);
        if (!originals) { originals = new Map(); originalAttributes.set(node, originals); }
        translatableAttributes.forEach((attribute) => {
          const current = node.getAttribute(attribute);
          if (!current) return;
          if (!originals!.has(attribute)) originals!.set(attribute, current);
          const source = originals!.get(attribute) || current;
          const normalized = normalize(source);
          node.setAttribute(attribute, language === 'fr' ? (localeTextMap[normalized] || source) : (frenchToEnglish[normalized] || source));
        });
      });

      document.querySelectorAll<HTMLElement>('[data-runtime-locale-source]').forEach((node) => {
        const source = node.getAttribute('data-runtime-locale-source') || '';
        const attribute = node.getAttribute('data-runtime-locale-attr');
        if (attribute) node.setAttribute(attribute, language === 'fr' ? (localeTextMap[source] || source) : (frenchToEnglish[source] || source));
      });
    };

    translate();
    i18n.on('languageChanged', translate);
    const observer = new MutationObserver(() => translate());
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { i18n.off('languageChanged', translate); observer.disconnect(); };
  }, [i18n]);

  return null;
}
