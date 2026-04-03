FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# Remove .env if accidentally present
RUN rm -f .env

# Uploaded files need to be writable by the app user
RUN chown -R appuser:appgroup /app/public/uploads /app/public/albumCover

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
