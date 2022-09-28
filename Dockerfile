FROM node:16-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates \
    openssh-client

USER node

WORKDIR /home/node/app

CMD ["sh", "-c", "npm install && tail -f /dev/null"]