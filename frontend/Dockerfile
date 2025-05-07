# # Frontend using Node 18
# FROM node:18-slim AS frontend

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]

# Frontend using Node 18
FROM node:18-slim AS frontend

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the frontend for production
RUN npm run start

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
