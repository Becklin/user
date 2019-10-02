FROM node:10

WORKDIR /Users/beck.lin/Documents/test

COPY ./server/index.js ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server/index.js"]


