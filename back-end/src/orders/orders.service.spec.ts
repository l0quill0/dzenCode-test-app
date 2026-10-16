import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OrdersService } from './orders.service.js';

describe('OrdersService', () => {
  let service: OrdersService;
  const mockPrisma = {
    order: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new OrdersService(mockPrisma as never);
  });

  it('should return all orders with nested products', async () => {
    const orders = [{ id: 1, title: 'Order 1', products: [] }];
    mockPrisma.order.findMany.mockResolvedValue(orders);

    const result = await service.findAll();

    expect(result).toEqual(orders);
    expect(mockPrisma.order.findMany).toHaveBeenCalledOnce();
  });

  it('should return a single order by id', async () => {
    const order = { id: 1, title: 'Order 1', products: [] };
    mockPrisma.order.findUnique.mockResolvedValue(order);

    const result = await service.findOne(1);

    expect(result).toEqual(order);
    expect(mockPrisma.order.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  it('should throw NotFoundException when order does not exist', async () => {
    mockPrisma.order.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete an order by id', async () => {
    const deleted = { id: 1, title: 'Order 1' };
    mockPrisma.order.delete.mockResolvedValue(deleted);

    const result = await service.remove(1);

    expect(result).toEqual(deleted);
    expect(mockPrisma.order.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
