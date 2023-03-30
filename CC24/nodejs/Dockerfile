FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV NODE_ENV development

EXPOSE 4424

CMD ["npm", "run", "start"]