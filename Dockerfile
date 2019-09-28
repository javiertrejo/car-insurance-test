FROM node:6

WORKDIR /app

COPY . .

RUN yarn --prod

CMD [ "yarn", "after-30-days" ]