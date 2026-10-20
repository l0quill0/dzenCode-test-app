# Stage 1: Build
FROM node:24-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy only package manifests first so npm ci layer is cached when source files change
COPY package.json package-lock.json ./
COPY back-end/package.json ./back-end/package.json

# Install back-end workspace dependencies
RUN npm ci --workspace=back-end --include-workspace-root

# Copy back-end source files (without overwriting back-end/node_modules)
COPY back-end/prisma ./back-end/prisma
COPY back-end/src ./back-end/src
COPY back-end/nest-cli.json back-end/tsconfig.json back-end/tsconfig.build.json back-end/prisma7.config.ts ./back-end/

WORKDIR /app/back-end

# Generate Prisma Client and build NestJS app
RUN npx prisma generate
RUN npm run build

# Stage 2: Production runtime
FROM node:24-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

WORKDIR /app/back-end

ENV NODE_ENV=production
ENV NODE_PATH=/app/node_modules:/app/back-end/node_modules

EXPOSE 3000

# Run migrations, seed initial data, and start the NestJS server
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/main.js"]
