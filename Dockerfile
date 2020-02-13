FROM node:12-alpine as builder

ENV NODE_ENV build
WORKDIR /api

COPY . /api
RUN npm ci && npm run build

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
COPY --from=builder /api/.env /api/.env
COPY --from=builder /api/run.sh /api/run.sh
ARG DD_API_KEY
ENV DD_API_KEY ${DD_API_KEY}
ARG DD_AGENT_MAJOR_VERSION
ENV DD_AGENT_MAJOR_VERSION ${DD_AGENT_MAJOR_VERSION}
RUN DD_INSTALL_ONLY=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
RUN npm ci

EXPOSE 3000
CMD ["/bin/sh", "./run.sh"]




