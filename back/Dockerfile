FROM node:lts-alpine as ts-compiler

RUN mkdir /app
WORKDIR /app
COPY package*.json ./

RUN npm i

COPY ./ ./

CMD ./start.sh