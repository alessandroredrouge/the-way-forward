# Multi-stage build

# Backend stage
FROM python:3.11-slim AS backend

WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Frontend stage
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ .

# Build the frontend
RUN npm run build

# Final stage
FROM nginx:alpine

# Copy built frontend from frontend stage
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Install Python for the backend
RUN apk add --no-cache python3 py3-pip

# Copy backend from backend stage
COPY --from=backend /app/backend /app/backend
COPY --from=backend /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Create start script and make it executable
COPY --from=backend /app/backend /app/backend
RUN echo '#!/bin/sh\n\
nginx &\n\
cd /app/backend && python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4\n\
' > /docker-entrypoint.d/40-start-services.sh && \
chmod +x /docker-entrypoint.d/40-start-services.sh

# Expose ports for both services
EXPOSE 80 8000

# Use the default nginx entrypoint
# The nginx image will automatically execute scripts in /docker-entrypoint.d/