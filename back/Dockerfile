FROM node:latest

WORKDIR /src/app/back

COPY . .

RUN npm ci

RUN apt update && apt install fish -y && fish

CMD npm run start:dev