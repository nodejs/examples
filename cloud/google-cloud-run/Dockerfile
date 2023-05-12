FROM node:20 as base
WORKDIR /usr/app

FROM base as build
WORKDIR /usr/app
ENV NODE_ENV=production
ENV CI=true
COPY package.json package-lock.json ./
RUN npm install --production
COPY . ./

FROM node:20 as production
WORKDIR /usr/app
ENV NODE_ENV=production
COPY --from=build /usr/app ./
CMD ["node", "index.js"]
