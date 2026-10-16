import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  let service: ProductsService;
  const mockPrisma = {
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ProductsService(mockPrisma as never);
  });

  it('should return all products with optional filters', async () => {
    const products = [{ id: 1, title: 'Product 1', type: 'Monitors' }];
    mockPrisma.product.findMany.mockResolvedValue(products);

    const result = await service.findAll({ type: 'Monitors' });

    expect(result).toEqual(products);
    expect(mockPrisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { type: 'Monitors' },
      }),
    );
  });

  it('should return a single product by id', async () => {
    const product = { id: 1, title: 'Product 1' };
    mockPrisma.product.findUnique.mockResolvedValue(product);

    const result = await service.findOne(1);

    expect(result).toEqual(product);
  });

  it('should throw NotFoundException when product is not found', async () => {
    mockPrisma.product.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a product by id', async () => {
    const deleted = { id: 1, title: 'Product 1' };
    mockPrisma.product.delete.mockResolvedValue(deleted);

    const result = await service.remove(1);

    expect(result).toEqual(deleted);
    expect(mockPrisma.product.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
