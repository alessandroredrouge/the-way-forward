FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# The actual application code will be mounted as a volume in development
# This allows for hot-reloading

# Expose Vite dev server port
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
