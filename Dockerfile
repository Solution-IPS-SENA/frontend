# Coonstrucción del frontend
FROM node:16.15.0-alpine AS front_build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Sirviendo el frontenden nginx
FROM nginx:alpine
COPY --from=front_build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
