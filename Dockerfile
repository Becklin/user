FROM node:10
FROM mysql

WORKDIR /Users/beck.lin/Documents/test

COPY ./server/index.js ./

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD ["node", "server/index.js"]


