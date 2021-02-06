FROM node:14-alpine

WORKDIR /usr/node_app

COPY package.json .
RUN npm install

ADD . /usr/node_app
RUN npm run build

CMD [ "npm", "run", "start" ]