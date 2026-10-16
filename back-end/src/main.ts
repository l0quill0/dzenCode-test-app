import { join } from 'node:path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module.js';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useStaticAssets(join(process.cwd(), 'prisma', 'seed-assets'), {
    prefix: '/seed-assets/',
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
