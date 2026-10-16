import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UsersService } from './users.service.js';

describe('UsersService', () => {
  let service: UsersService;
  const mockPrisma = {
    user: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new UsersService(mockPrisma as never);
  });

  it('should return all users', async () => {
    const users = [{ id: 1, email: 'alex@dzencode.com', name: 'Alex' }];
    mockPrisma.user.findMany.mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toEqual(users);
  });

  it('should return a user by id', async () => {
    const user = { id: 1, email: 'alex@dzencode.com', name: 'Alex' };
    mockPrisma.user.findUnique.mockResolvedValue(user);

    const result = await service.findOne(1);

    expect(result).toEqual(user);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
