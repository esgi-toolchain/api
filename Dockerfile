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
COPY --from=builder /api/.env /api/.env

ENV DD_API_KEY=a832bd9d0dd7675c5197119d84dc103c
RUN bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"

RUN npm ci

EXPOSE 80
CMD ["node", "dist/main.js"]
