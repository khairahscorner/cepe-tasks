FROM node:19.4.0

WORKDIR /lru-cache

COPY src.js ./
COPY cache.js ./
COPY linkedlist.js ./
COPY package.json ./

RUN npm install

EXPOSE 8081

CMD [ "node", "src.js" ]