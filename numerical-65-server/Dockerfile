FROM node:18-alpine

WORKDIR /src/app

COPY package.json ./
RUN npm i

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]
