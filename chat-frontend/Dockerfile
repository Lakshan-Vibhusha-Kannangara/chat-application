# Stage 1: Build the Angular application
FROM node:18-alpine as angular
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the Angular app using HTTPD
FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /app/dist/chat-frontend/ .
