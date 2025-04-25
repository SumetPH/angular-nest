FROM node:20.11.1-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start:prod"]
EXPOSE 8001