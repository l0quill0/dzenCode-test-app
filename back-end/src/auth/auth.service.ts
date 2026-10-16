import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.signToken(user.id, user.email);
    const { password: _, ...userWithoutPassword } = user;

    return {
      accessToken: token,
      user: userWithoutPassword,
    };
  }

  private signToken(userId: number, email: string): Promise<string> {
    return this.jwtService.signAsync({ sub: userId, email });
  }
}
