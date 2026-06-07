FROM node:22
WORKDIR /front
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
RUN ["npm", "run", "dev"]