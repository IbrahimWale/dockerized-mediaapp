FROM node:18-alpine AS backend

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the application source code
COPY . .

EXPOSE 5000
CMD ["npm", "start"]
