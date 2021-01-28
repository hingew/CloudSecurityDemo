FROM node:14-alpine3.12

RUN apk add yarn

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD yarn start
