FROM node:lts as common

RUN mkdir /app
WORKDIR /app
COPY package*.json ./

RUN npm i

COPY ./ ./
RUN npm run build

FROM common as development
CMD ./start.sh

FROM common as production
CMD npm run start

FROM common as ci
CMD npm run test