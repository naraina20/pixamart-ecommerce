# Stage 1: Build React app
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the build folder
FROM node:18-alpine
WORKDIR /app

# Install "serve" globally
RUN npm install -g serve

# Copy only the build folder from builder stage
COPY --from=builder /app/build ./build

# Expose port 3000
EXPOSE 3000

# Run serve to serve the build folder
CMD ["serve", "-s", "build", "-l", "3000"]
