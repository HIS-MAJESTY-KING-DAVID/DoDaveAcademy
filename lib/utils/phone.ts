export type PhoneOperator = 'orange' | 'mtn' | 'unknown';

const ORANGE_PREFIXES = ['69', '65', '68', '67'];
const MTN_PREFIXES = ['66', '67', '68', '69'];

export function checkNumberOperator(phone: string): PhoneOperator {
  const cleaned = phone.replace(/[^0-9]/g, '');
  const prefix = cleaned.substring(0, 2);

  if (ORANGE_PREFIXES.includes(prefix)) return 'orange';
  if (MTN_PREFIXES.includes(prefix)) return 'mtn';
  return 'unknown';
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');

  if (cleaned.startsWith('237')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('+237')) {
    return cleaned;
  }
  return `+237${cleaned}`;
}

export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9]/g, '');
  const number = cleaned.replace(/^237/, '');
  return /^[6][0-9]{8}$/.test(number);
}
