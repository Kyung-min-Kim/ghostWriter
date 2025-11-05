##########################################
# 1️⃣ BUILD STAGE (Debian base + WASM build)
##########################################
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Copy package manifest first
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Disable telemetry and force WASM compiler (avoid native SWC crash)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_DISABLE_SWC_BINARY=1
ENV NEXT_FORCE_WASM_BUILD=1

# Rebuild esbuild and run build (forces Next.js to use WASM)
RUN npm rebuild esbuild && npm run build


##########################################
# 2️⃣ RUNTIME STAGE (smaller, production only)
##########################################
FROM node:20-bookworm-slim AS runner
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Environment configuration
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000

# Start Next.js app
CMD ["npm", "run", "start"]
