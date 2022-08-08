FROM node:latest

WORKDIR /src/app/front

COPY . .

RUN npm ci

RUN apt update && apt install fish -y && fish

CMD npm run start