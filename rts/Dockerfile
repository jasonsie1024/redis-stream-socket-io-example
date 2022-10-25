FROM node:16
WORKDIR /app
COPY package*.json ./
RUN yarn

COPY *.js ./
COPY index.html ./
CMD yarn start