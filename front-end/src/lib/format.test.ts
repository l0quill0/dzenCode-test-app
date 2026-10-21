import { describe, expect, it } from 'vitest';
import {
  formatFullDate,
  formatNumericDate,
  formatPrice,
  formatPriceValue,
  formatShortDate,
  getOrderTotalPrices,
  getProductsCountLabel,
  getSortedPrices,
} from './format';
import type { Price, Product } from '@/types';

describe('format utilities', () => {
  it('formatShortDate formats valid date', () => {
    expect(formatShortDate('2017-06-29T12:09:33.000Z')).toBe('29 / 06');
    expect(formatShortDate('invalid')).toBe('—');
  });

  it('formatFullDate formats day, month name, and year', () => {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    expect(formatFullDate('2017-06-29T12:09:33.000Z', months)).toBe('29 / Июн / 2017');
    expect(formatFullDate('invalid', months)).toBe('—');
  });

  it('formatNumericDate formats DD / MM / YYYY', () => {
    expect(formatNumericDate('2017-06-29T12:09:33.000Z')).toBe('29 / 06 / 2017');
    expect(formatNumericDate('invalid')).toBe('—');
  });

  it('formatPriceValue formats with thousand spaces and symbol replacement', () => {
    expect(formatPriceValue(2500, 'USD')).toBe('2 500 $');
    expect(formatPriceValue(250000.5, 'UAH')).toBe('250 000.50 UAH');
    expect(formatPriceValue(100, 'EUR')).toBe('100 EUR');
  });

  it('formatPrice returns undefined for null or undefined input', () => {
    expect(formatPrice(null)).toBeUndefined();
    expect(formatPrice(undefined)).toBeUndefined();
    expect(formatPrice({ value: 1200, symbol: 'USD' })).toBe('1 200 $');
  });

  it('getProductsCountLabel follows pluralization rules', () => {
    const labels = { one: 'продукт', few: 'продукта', many: 'продуктов' };
    expect(getProductsCountLabel(1, labels)).toBe('продукт');
    expect(getProductsCountLabel(21, labels)).toBe('продукт');
    expect(getProductsCountLabel(2, labels)).toBe('продукта');
    expect(getProductsCountLabel(4, labels)).toBe('продукта');
    expect(getProductsCountLabel(5, labels)).toBe('продуктов');
    expect(getProductsCountLabel(11, labels)).toBe('продуктов');
    expect(getProductsCountLabel(0, labels)).toBe('продуктов');
  });

  it('getSortedPrices separates default and secondary prices', () => {
    const prices: Price[] = [
      { id: 1, value: 100, symbol: 'USD', isDefault: 0, productId: 1 },
      { id: 2, value: 2600, symbol: 'UAH', isDefault: 1, productId: 1 },
    ];
    const { defaultPrice, secondaryPrice } = getSortedPrices(prices);
    expect(defaultPrice?.symbol).toBe('UAH');
    expect(secondaryPrice?.symbol).toBe('USD');
  });

  it('getOrderTotalPrices aggregates across multiple products', () => {
    const products: Product[] = [
      {
        id: 1,
        serialNumber: '111',
        isNew: 1,
        photo: '',
        title: 'P1',
        type: 'Monitors',
        specification: '',
        status: 'FREE',
        statusStart: '',
        statusEnd: null,
        guaranteeStart: '',
        guaranteeEnd: '',
        orderId: 1,
        groupId: null,
        userId: null,
        date: '',
        price: [
          { id: 1, value: 100, symbol: 'USD', isDefault: 0, productId: 1 },
          { id: 2, value: 2600, symbol: 'UAH', isDefault: 1, productId: 1 },
        ],
      },
      {
        id: 2,
        serialNumber: '222',
        isNew: 1,
        photo: '',
        title: 'P2',
        type: 'Monitors',
        specification: '',
        status: 'FREE',
        statusStart: '',
        statusEnd: null,
        guaranteeStart: '',
        guaranteeEnd: '',
        orderId: 1,
        groupId: null,
        userId: null,
        date: '',
        price: [
          { id: 3, value: 200, symbol: 'USD', isDefault: 0, productId: 2 },
          { id: 4, value: 5200, symbol: 'UAH', isDefault: 1, productId: 2 },
        ],
      },
    ];

    const totals = getOrderTotalPrices(products);
    expect(totals.defaultPrice).toEqual({ value: 7800, symbol: 'UAH' });
    expect(totals.secondaryPrice).toEqual({ value: 300, symbol: 'USD' });
  });
});
