FROM node:alpine

# Required for next builds to work
RUN apk update && \
    apk add --no-cache libc6-compat autoconf automake libtool make tiff jpeg zlib zlib-dev pkgconf nasm file gcc musl-dev

RUN mkdir -p /app

ENV PORT 3001
ARG api
ENV API_URL $api

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install

COPY . /app/

ENV NODE_ENV production
RUN yarn build

RUN chown -R /app node

EXPOSE 3001

# Production use node instead of root
USER node

CMD [ "npm", "run", "start" ]
