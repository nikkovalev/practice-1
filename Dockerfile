FROM node:alpine as deps

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

ENV NODE_ENV development
ENV PORT 3001

# Required for next builds to work
RUN apk update 
RUN apk add --no-cache libc6-compat autoconf automake libtool make tiff jpeg zlib zlib-dev pkgconf nasm file gcc musl-dev
RUN yarn install --frozen-lockfile

FROM deps as prod

WORKDIR /app
COPY . .

ENV NODE_ENV production


RUN yarn build

RUN chown -R node /app

EXPOSE 3001

# Production use node instead of root
USER node

CMD [ "npm", "run", "start" ]
