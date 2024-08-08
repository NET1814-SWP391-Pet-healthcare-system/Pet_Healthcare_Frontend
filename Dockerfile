# Build stage
FROM node:18 as build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Production stage
FROM node:18-alpine as production
WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]