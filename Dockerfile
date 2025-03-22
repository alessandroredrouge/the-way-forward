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

# Final stage - use a custom image that includes both nginx and Python
FROM python:3.11-slim

WORKDIR /app

# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build from frontend stage
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
# Copy backend from backend stage
COPY --from=backend /app/backend /app/backend

# Install backend dependencies (copied from backend stage)
COPY --from=backend /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Create a startup script
RUN echo '#!/bin/bash\n\
service nginx start\n\
cd /app/backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4\n\
' > /start.sh && chmod +x /start.sh

# Expose ports
EXPOSE 80 8000

# Use a simple CMD that runs our script
CMD ["/start.sh"]