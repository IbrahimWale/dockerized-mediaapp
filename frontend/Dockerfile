FROM node:18-slim AS frontend

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
