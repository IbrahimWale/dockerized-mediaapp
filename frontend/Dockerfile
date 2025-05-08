FROM node:18-slim AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run start

EXPOSE 3000

CMD ["npm", "start"]
