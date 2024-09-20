FROM node:18-alpine

WORKDIR /app

COPY package*.json ./


RUN npm install --force --legacy-peer-deps

RUN npm install react-scripts --force --legacy-peer-deps


COPY . .

RUN npm install typescript --force --legacy-peer-deps


RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
