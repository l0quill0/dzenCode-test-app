import type { Price, Product } from '@/types';

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

export function formatPrice(
  price: { value: number; symbol: string } | null | undefined,
): string | undefined {
  return price ? formatPriceValue(price.value, price.symbol) : undefined;
}

export function getOrderTotalPrices(products: Product[] = []): {
  defaultPrice: { value: number; symbol: string } | null;
  secondaryPrice: { value: number; symbol: string } | null;
} {
  let defaultSum = 0;
  let secondarySum = 0;
  let defaultSymbol = '';
  let secondarySymbol = '';
  let hasDefault = false;
  let hasSecondary = false;

  for (const product of products) {
    if (!product.price || product.price.length === 0) continue;
    const { defaultPrice, secondaryPrice } = getSortedPrices(product.price);
    if (defaultPrice) {
      defaultSum += defaultPrice.value;
      defaultSymbol = defaultPrice.symbol;
      hasDefault = true;
    }
    if (secondaryPrice) {
      secondarySum += secondaryPrice.value;
      secondarySymbol = secondaryPrice.symbol;
      hasSecondary = true;
    }
  }

  return {
    defaultPrice: hasDefault ? { value: defaultSum, symbol: defaultSymbol } : null,
    secondaryPrice:
      hasSecondary &&
      (secondarySum !== defaultSum || secondarySymbol !== defaultSymbol)
        ? { value: secondarySum, symbol: secondarySymbol }
        : null,
  };
}

export function getProductsCountLabel(
  count: number,
  labels: { one: string; few: string; many: string },
): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return labels.one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return labels.few;
  }
  return labels.many;
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
