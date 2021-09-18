FROM node:14-alpine3.12

WORKDIR /home/app

RUN apk add yarn

COPY package.json /home/app/
COPY yarn.lock /home/app/

RUN yarn install --frozen-lockfile

COPY . /home/app

CMD ./scripts/startup.sh