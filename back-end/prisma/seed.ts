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

async function upsertProductWithPrices(data: {
  id: number;
  serialNumber: string;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  status: ProductStatus;
  statusStart: Date;
  statusEnd: Date | null;
  guaranteeStart: Date;
  guaranteeEnd: Date;
  orderId: number;
  groupId: number | null;
  userId: number | null;
  date: Date;
}) {
  const { id, ...fields } = data;

  await prisma.product.upsert({
    where: { id },
    update: {
      ...fields,
      price: {
        deleteMany: {},
        create: [
          { value: 2500, symbol: 'USD', isDefault: 0 },
          { value: 250000.5, symbol: 'UAH', isDefault: 1 },
        ],
      },
    },
    create: {
      ...fields,
      price: {
        create: [
          { value: 2500, symbol: 'USD', isDefault: 0 },
          { value: 250000.5, symbol: 'UAH', isDefault: 1 },
        ],
      },
    },
  });
}

async function main() {
  console.log('Seeding database...');

  const userPassword = await bcrypt.hash('password123', SALT_ROUNDS);
  const user = await prisma.user.upsert({
    where: { email: 'alex@dzencode.com' },
    update: {
      name: 'Христорождественский Александр',
      avatar: '',
      password: userPassword,
    },
    create: {
      email: 'alex@dzencode.com',
      name: 'Христорождественский Александр',
      avatar: '',
      password: userPassword,
    },
  });

  const group1 = await prisma.group.upsert({
    where: { id: 1 },
    update: {
      name: 'Длинное предлинное длиннючее название группы',
    },
    create: {
      name: 'Длинное предлинное длиннючее название группы',
    },
  });

  const order1 = await prisma.order.upsert({
    where: { id: 1 },
    update: {
      title: 'Длинное предлинное длиннючее название прихода',
      date: new Date('2017-04-06'),
      description: 'desc',
    },
    create: {
      title: 'Длинное предлинное длиннючее название прихода',
      date: new Date('2017-04-06'),
      description: 'desc',
    },
  });

  const order2 = await prisma.order.upsert({
    where: { id: 2 },
    update: {
      title: 'Длинное название прихода',
      date: new Date('2017-09-06'),
      description: 'desc',
    },
    create: {
      title: 'Длинное название прихода',
      date: new Date('2017-09-06'),
      description: 'desc',
    },
  });

  const order3 = await prisma.order.upsert({
    where: { id: 3 },
    update: {
      title: 'Длинное предлинное длиннючее длиннючее название прихода',
      date: new Date('2017-06-06'),
      description: 'desc',
    },
    create: {
      title: 'Длинное предлинное длиннючее длиннючее название прихода',
      date: new Date('2017-06-06'),
      description: 'desc',
    },
  });

  const order4 = await prisma.order.upsert({
    where: { id: 4 },
    update: {
      title: 'Длинное предлинное название прихода',
      date: new Date('2017-02-06'),
      description: 'desc',
    },
    create: {
      title: 'Длинное предлинное название прихода',
      date: new Date('2017-02-06'),
      description: 'desc',
    },
  });

  await upsertProductWithPrices({
    id: 1,
    serialNumber: 'SN-12.3456789',
    isNew: 1,
    photo: '',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Monitors',
    specification: 'Specification 1',
    status: ProductStatus.FREE,
    statusStart: new Date('2017-04-06'),
    statusEnd: null,
    guaranteeStart: new Date('2017-04-06'),
    guaranteeEnd: new Date('2025-08-06'),
    orderId: order1.id,
    groupId: group1.id,
    userId: null,
    date: new Date('2017-09-06'),
  });

  await upsertProductWithPrices({
    id: 2,
    serialNumber: 'SN-12.3456789',
    isNew: 0,
    photo: '',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Monitors',
    specification: 'Specification 1',
    status: ProductStatus.IN_REPAIR,
    statusStart: new Date('2017-04-06'),
    statusEnd: new Date('2025-08-06'),
    guaranteeStart: new Date('2017-04-06'),
    guaranteeEnd: new Date('2025-08-06'),
    orderId: order2.id,
    groupId: group1.id,
    userId: null,
    date: new Date('2017-09-06'),
  });

  for (let i = 0; i < 6; i++) {
    await upsertProductWithPrices({
      id: 3 + i,
      serialNumber: 'SN-12.3456789',
      isNew: 1,
      photo: '',
      title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
      type: 'Monitors',
      specification: 'Specification 1',
      status: ProductStatus.FREE,
      statusStart: new Date('2017-04-06'),
      statusEnd: null,
      guaranteeStart: new Date('2017-04-06'),
      guaranteeEnd: new Date('2025-08-06'),
      orderId: order3.id,
      groupId: null,
      userId: user.id,
      date: new Date('2017-09-06'),
    });
  }

  await upsertProductWithPrices({
    id: 9,
    serialNumber: 'SN-12.3456789',
    isNew: 0,
    photo: '',
    title: 'Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3',
    type: 'Monitors',
    specification: 'Specification 1',
    status: ProductStatus.IN_REPAIR,
    statusStart: new Date('2017-04-06'),
    statusEnd: new Date('2025-08-06'),
    guaranteeStart: new Date('2017-04-06'),
    guaranteeEnd: new Date('2025-08-06'),
    orderId: order4.id,
    groupId: group1.id,
    userId: null,
    date: new Date('2017-09-06'),
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
