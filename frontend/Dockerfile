# --- deps: install dependencies separately so they're cached across builds ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- builder: build the Next.js app ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js's public/ folder is optional in a normal project, but the COPY
# below needs it to exist. Guarantee it regardless of what's in source.
RUN mkdir -p ./public

# Baked in at build time (Next.js inlines NEXT_PUBLIC_* vars into the client bundle).
# Empty string = same-origin, relative requests -> works behind the nginx proxy.
ARG NEXT_PUBLIC_API_URL=""
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# --- runner: slim runtime image using the Next.js standalone output ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]