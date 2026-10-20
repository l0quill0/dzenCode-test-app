# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /app

# Copy workspace manifests
COPY package.json package-lock.json ./
COPY front-end/package.json ./front-end/package.json

# Install front-end workspace dependencies
RUN npm ci --workspace=front-end --include-workspace-root

# Copy front-end source files
COPY front-end ./front-end

WORKDIR /app/front-end

ARG NEXT_PUBLIC_API_URL=http://localhost:3000
ARG NEXT_PUBLIC_WS_URL=http://localhost:3000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

RUN npm run build

# Stage 2: Production runtime
FROM node:24-alpine AS runner

WORKDIR /app

COPY --from=builder /app ./

WORKDIR /app/front-end

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["npx", "next", "start", "-p", "3001"]
