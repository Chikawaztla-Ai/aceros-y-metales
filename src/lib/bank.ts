// ============================================================
// Datos bancarios para transferencia — acerosymetalesurgentes.com
// Se leen de variables de entorno (NO usar NEXT_PUBLIC_: sólo servidor).
// Ajusta los valores reales en .env.local / Vercel.
// ============================================================

export interface BankDetails {
  bank: string;
  beneficiary: string;
  clabe: string;
  account: string;
}

export function getBankDetails(): BankDetails {
  return {
    bank: process.env.BANK_NAME || 'BBVA México',
    beneficiary:
      process.env.BANK_BENEFICIARY || 'Aceros y Metales Urgentes S.A. de C.V.',
    clabe: process.env.BANK_CLABE || '012180000000000000',
    account: process.env.BANK_ACCOUNT || '0000000000',
  };
}
