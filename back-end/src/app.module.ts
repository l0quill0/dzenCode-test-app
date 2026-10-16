import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProductsModule } from './products/products.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    OrdersModule,
    ProductsModule,
    SessionsModule,
  ],
})
export class AppModule {}
