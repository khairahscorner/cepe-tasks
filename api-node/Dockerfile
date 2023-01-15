FROM node:16-alpine

WORKDIR /api-node

COPY src.js ./
COPY package.json ./

RUN npm install

EXPOSE 3000

CMD [ "node", "src.js" ]