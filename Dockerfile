ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run copy-files
EXPOSE 4000
CMD ["npm", "run", "start"]
