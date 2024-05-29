FROM node:18-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=build-stage /app/dist/gestion-produits/ /usr/share/nginx/html/
