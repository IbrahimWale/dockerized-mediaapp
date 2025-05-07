# # Backend using latest Node.js
# FROM node:current-alpine AS backend

# WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./

# RUN npm install

# COPY . .

# EXPOSE 5000

# CMD ["npm", "start"]

# Backend using Node 18 Alpine for a smaller image
FROM node:18-alpine AS backend

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the application port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
