FROM node:12
WORKDIR /usr/src/clean-node
COPY ./package.json .
RUN yarn --only=prod
COPY ./build ./build
EXPOSE 4000
CMD yarn start