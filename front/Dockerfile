FROM node:lts-alpine as common

RUN mkdir /app
WORKDIR /app
COPY package*.json ./

RUN npm i

COPY ./ ./

FROM common as development
CMD npm start

FROM common as production
CMD npm run build