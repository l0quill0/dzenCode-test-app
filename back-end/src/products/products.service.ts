import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface FindProductsFilter {
  type?: string;
  specification?: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filter: FindProductsFilter = {}) {
    return this.prisma.product.findMany({
      where: {
        ...(filter.type && { type: filter.type }),
        ...(filter.specification && { specification: filter.specification }),
      },
      include: {
        price: true,
        order: true,
        group: true,
        user: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        price: true,
        order: true,
        group: true,
        user: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
