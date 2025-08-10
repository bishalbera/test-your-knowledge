# --- Build Stage ---
FROM node:20-bullseye AS builder

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json prisma/schema.prisma ./
RUN apt-get update -y && apt-get install -y openssl

# Inject secrets securely (reading from a mounted file)
ARG CLERK_SECRET_FILE=/run/secrets/.env.loacl
COPY $CLERK_SECRET_FILE /tmp/.env.local
RUN export $(grep -v '^#' /tmp/.env.local | xargs) && rm -f /tmp/.env.local

RUN npm install 

# Build TypeScript
COPY . .
RUN npm run build

# --- Runtime Stage ---
FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# Copy necessary files from the builder stage
COPY --chown=node:node --from=builder /app/package.json .
COPY --chown=node:node --from=builder /app/build .
COPY --chown=node:node --from=builder /app/node_modules ./node_modules  # Already contains Prisma client

EXPOSE 4500
CMD ["npm", "start"]

# --- Next.js Build Stage ---
FROM node:20-bullseye AS nextjs-builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json prisma/schema.prisma ./
RUN apt-get update -y && apt-get install -y openssl

# Inject secrets securely
ARG CLERK_SECRET_FILE=/run/secrets/.env.local
COPY $CLERK_SECRET_FILE /tmp/.env.local
RUN export $(grep -v '^#' /tmp/.env.local | xargs) && rm -f /tmp/.env.local

RUN npm install   # postinstall runs `npx prisma generate`

# Copy the rest of the app and build Next.js
COPY . .
RUN npm run build

# --- Next.js Runtime Stage ---
FROM node:20-bullseye

WORKDIR /app

# Copy only necessary files from the Next.js build stage
COPY --from=nextjs-builder /app/package.json ./
COPY --from=nextjs-builder /app/.next ./.next
COPY --from=nextjs-builder /app/public ./public
COPY --from=nextjs-builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
