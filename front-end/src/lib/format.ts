import type { Price } from '@/types';

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day} / ${month}`;
}

export function formatFullDate(dateStr: string, months: string[]): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const monthName = months[date.getMonth()] ?? '';
  const year = date.getFullYear();
  return `${day} / ${monthName} / ${year}`;
}

export function formatNumericDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '—';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
}

export function formatPriceValue(value: number, symbol: string): string {
  const [intPart, decPart] = value.toFixed(2).split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const hasDecimals = decPart && decPart !== '00';
  const numberStr = hasDecimals
    ? `${formattedInt}.${decPart}`
    : formattedInt;
  const displaySymbol = symbol === 'USD' ? '$' : symbol;
  return `${numberStr} ${displaySymbol}`;
}

export function formatPrice(price: Price | null): string | undefined {
  return price ? formatPriceValue(price.value, price.symbol) : undefined;
}

export function getSortedPrices(prices: Price[] = []): {
  secondaryPrice: Price | null;
  defaultPrice: Price | null;
} {
  const defaultPrice =
    prices.find((p) => p.isDefault === 1) ?? prices[0] ?? null;
  const secondaryPrice =
    prices.find((p) => p.isDefault === 0 && p.id !== defaultPrice?.id) ?? null;
  return { secondaryPrice, defaultPrice };
}
