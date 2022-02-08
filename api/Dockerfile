FROM node:16

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock

COPY ./tsconfig.json tsconfig.json
COPY ./jwtRS256.sh jwtRS256.sh
# temporary
COPY ./access.key access.key
COPY ./access.key.pub access.key.pub
COPY ./refresh.key refresh.key
COPY ./refresh.key.pub refresh.key.pub
# temporary
COPY ./src src

# build included in postinstall
RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]