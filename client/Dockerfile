FROM node:16

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

COPY ./.babelrc .babelrc
COPY ./.eslintignore .eslintignore
COPY ./.eslintrc .eslintrc
COPY ./tsconfig.json tsconfig.json
COPY ./webpack.config.babel.ts webpack.config.babel.ts

COPY ./public public
COPY ./src src

RUN yarn build

CMD ["yarn", "serve"]

EXPOSE 4000