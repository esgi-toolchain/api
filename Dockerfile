FROM node:12-alpine as builder

ENV NODE_ENV build
WORKDIR /api

COPY . /api
ENV DATABASE_CONNECTION mysql
ENV DATABASE_HOST orchestration.mysql.database.azure.com
ENV DATABASE_USERNAME shengael@orchestration
ENV DATABASE_PASSWORD orchEsgi98
ENV DATABASE_DATABASE classroom
ENV DATABASE_PORT 3306
ENV DATABASE_SYNCHRONIZE true
ENV DATABASE_LOGGING true

RUN npm ci && npm run build && npm test

FROM ubuntu:18.04

ENV NODE_ENV production
# Install Node.js
RUN apt update --yes
RUN apt install --yes curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

WORKDIR /api

COPY --from=builder /api/package*.json /api/
COPY --from=builder /api/dist/ /api/dist/
COPY --from=builder /api/run.sh /api/run.sh
COPY --from=builder /api/datadog.sh /api/datadog.sh
ARG DD_API_KEY
ENV DD_API_KEY ${DD_API_KEY}
ARG DD_AGENT_MAJOR_VERSION
ENV DD_AGENT_MAJOR_VERSION ${DD_AGENT_MAJOR_VERSION}
RUN DD_INSTALL_ONLY=true bash -c "$(cat datadog.sh)"
RUN npm ci

EXPOSE 3000
CMD ["/bin/sh", "./run.sh"]




