import { describe, expect, it } from 'vitest';
import { frenchToEnglish, localeTextMap } from '@/components/runtimeTranslations';

describe('runtime localization catalog', () => {
  it('contains French translations for core shared and workflow copy', () => {
    expect(localeTextMap['Welcome Back']).toBe('Bon retour');
    expect(localeTextMap['Payment Checkout']).toBe('Paiement');
    expect(localeTextMap['Unable to save your progress. Please try again.']).toBe('Impossible d\'enregistrer votre progression. Veuillez réessayer.');
    expect(localeTextMap['Search']).toBe('Rechercher');
  });

  it('can restore representative French text to English', () => {
    expect(frenchToEnglish['Bon retour']).toBe('Welcome Back');
    expect(frenchToEnglish['Paiement']).toBe('Payment Checkout');
    expect(frenchToEnglish['Rechercher']).toBe('Search');
  });
});
