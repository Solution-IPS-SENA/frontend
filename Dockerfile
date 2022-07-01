# Coonstrucción del frontend
FROM node:16.15.0-alpine AS front_build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "deploy" ]
