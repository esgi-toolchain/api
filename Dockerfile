FROM node:12-alpine as builder

ENV NODE_ENV build
WORKDIR /api

COPY . /api

RUN npm ci && npm run build


FROM node:12-alpine

ENV NODE_ENV production

WORKDIR /api

COPY --from=builder /api/package*.json /api/
COPY --from=builder /api/dist/ /api/dist/

RUN npm ci

CMD ["node", "dist/main.js"]
