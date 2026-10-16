import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let service: AuthService;
  const mockUsersService = {
    findByEmailWithPassword: vi.fn(),
    findOne: vi.fn(),
  };
  const mockJwtService = {
    signAsync: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AuthService(
      mockUsersService as never,
      mockJwtService as never,
    );
  });

  it('should login user with valid credentials and omit password in response', async () => {
    const hashedPassword = await bcrypt.hash('password123', 4);
    mockUsersService.findByEmailWithPassword.mockResolvedValue({
      id: 1,
      email: 'alex@dzencode.com',
      name: 'Alex',
      avatar: '',
      password: hashedPassword,
    });
    mockJwtService.signAsync.mockResolvedValue('jwt-token');

    const result = await service.login({
      email: 'alex@dzencode.com',
      password: 'password123',
    });

    expect(result).toEqual({
      accessToken: 'jwt-token',
      user: {
        id: 1,
        email: 'alex@dzencode.com',
        name: 'Alex',
        avatar: '',
      },
    });
  });

  it('should throw UnauthorizedException for invalid password', async () => {
    const hashedPassword = await bcrypt.hash('password123', 4);
    mockUsersService.findByEmailWithPassword.mockResolvedValue({
      id: 1,
      email: 'alex@dzencode.com',
      password: hashedPassword,
    });

    await expect(
      service.login({
        email: 'alex@dzencode.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
