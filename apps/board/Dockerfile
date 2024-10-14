# Stage 1 : Build
FROM node:20.17.0 as builder

WORKDIR /usr/src/app

COPY . .
# RUN mkdir -p /var/app
# COPY ../../.. /var/app
# WORKDIR /var/app
# COPY . .

RUN npm install
RUN npm install -g @nestjs/cli

CMD [ "npm", "run", "start:dev", "board" ]


