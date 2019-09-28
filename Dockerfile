FROM node:6

WORKDIR /app

COPY . .

RUN yarn

CMD [ "yarn", "after-30-days" ]