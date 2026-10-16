import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, ProductStatus } from '../src/generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const SALT_ROUNDS = 10;

async function main() {
  console.log('Seeding database...');

  await prisma.price.deleteMany();
  await prisma.product.deleteMany();
  await prisma.order.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();

  const userPassword = await bcrypt.hash('password123', SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email: 'alex@dzencode.com',
      name: 'Христорождественский Александр',
      avatar: '',
      password: userPassword,
    },
  });

  const group1 = await prisma.group.create({
    data: {
      name: 'Длинное предлинное длиннючее название группы',
    },
  });

  const order1 = await prisma.order.create({
    data: {
      title: 'Длинное предлинное длиннючее название прихода',
      date: new Date('2017-04-06T12:09:33.000Z'),
      description: 'desc',
    },
  });

  const order2 = await prisma.order.create({
    data: {
      title: 'Длинное название прихода',
      date: new Date('2017-09-06T12:09:33.000Z'),
      description: 'desc',
    },
  });

  const order3 = await prisma.order.create({
    data: {
      title: 'Длинное предлинное длиннючее длиннючее название прихода',
      date: new Date('2017-06-06T12:09:33.000Z'),
      description: 'desc',
    },
  });

  const order4 = await prisma.order.create({
    data: {
      title: 'Длинное предлинное название прихода',
      date: new Date('2017-02-06T12:09:33.000Z'),
      description: 'desc',
    },
  });

  await prisma.product.create({
    data: {
      serialNumber: 'SN-12.3456789',
      isNew: 1,
      photo: '',
      title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
      type: 'Monitors',
      specification: 'Specification 1',
      status: ProductStatus.FREE,
      statusStart: new Date('2017-04-06T12:09:33.000Z'),
      statusEnd: null,
      guaranteeStart: new Date('2017-04-06T12:09:33.000Z'),
      guaranteeEnd: new Date('2025-08-06T12:09:33.000Z'),
      orderId: order1.id,
      groupId: group1.id,
      userId: null,
      date: new Date('2017-09-06T12:09:33.000Z'),
      price: {
        create: [
          { value: 2500, symbol: 'USD', isDefault: 0 },
          { value: 250000.5, symbol: 'UAH', isDefault: 1 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      serialNumber: 'SN-12.3456789',
      isNew: 0,
      photo: '',
      title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
      type: 'Monitors',
      specification: 'Specification 1',
      status: ProductStatus.IN_REPAIR,
      statusStart: new Date('2017-04-06T12:09:33.000Z'),
      statusEnd: new Date('2025-08-06T12:09:33.000Z'),
      guaranteeStart: new Date('2017-04-06T12:09:33.000Z'),
      guaranteeEnd: new Date('2025-08-06T12:09:33.000Z'),
      orderId: order2.id,
      groupId: group1.id,
      userId: null,
      date: new Date('2017-09-06T12:09:33.000Z'),
      price: {
        create: [
          { value: 2500, symbol: 'USD', isDefault: 0 },
          { value: 250000.5, symbol: 'UAH', isDefault: 1 },
        ],
      },
    },
  });

  for (let i = 0; i < 6; i++) {
    await prisma.product.create({
      data: {
        serialNumber: 'SN-12.3456789',
        isNew: 1,
        photo: '',
        title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
        type: 'Monitors',
        specification: 'Specification 1',
        status: ProductStatus.FREE,
        statusStart: new Date('2017-04-06T12:09:33.000Z'),
        statusEnd: null,
        guaranteeStart: new Date('2017-04-06T12:09:33.000Z'),
        guaranteeEnd: new Date('2025-08-06T12:09:33.000Z'),
        orderId: order3.id,
        groupId: null,
        userId: user.id,
        date: new Date('2017-09-06T12:09:33.000Z'),
        price: {
          create: [
            { value: 2500, symbol: 'USD', isDefault: 0 },
            { value: 250000.5, symbol: 'UAH', isDefault: 1 },
          ],
        },
      },
    });
  }

  await prisma.product.create({
    data: {
      serialNumber: 'SN-12.3456789',
      isNew: 0,
      photo: '',
      title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
      type: 'Monitors',
      specification: 'Specification 1',
      status: ProductStatus.IN_REPAIR,
      statusStart: new Date('2017-04-06T12:09:33.000Z'),
      statusEnd: new Date('2025-08-06T12:09:33.000Z'),
      guaranteeStart: new Date('2017-04-06T12:09:33.000Z'),
      guaranteeEnd: new Date('2025-08-06T12:09:33.000Z'),
      orderId: order4.id,
      groupId: group1.id,
      userId: null,
      date: new Date('2017-09-06T12:09:33.000Z'),
      price: {
        create: [
          { value: 2500, symbol: 'USD', isDefault: 0 },
          { value: 250000.5, symbol: 'UAH', isDefault: 1 },
        ],
      },
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
