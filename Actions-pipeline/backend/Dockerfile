FROM node.22
WORKDIR /back
COPY package.json .
RUN npm install
COPY . .
CMD ['npm', 'run', 'dev']
