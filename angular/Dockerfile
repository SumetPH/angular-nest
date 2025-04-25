FROM node:20.11.1-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.28.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/angular/browser /usr/share/nginx/html
EXPOSE 80
