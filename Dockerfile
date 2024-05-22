FROM node:20

WORKDIR /src/app

COPY package* .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
