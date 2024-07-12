FROM node:16-alpine
mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /app
COPY package*.json ./
USER node
RUN npm install
COPY . .
EXPOSE 80
CMD [ "node", "app.js" ]
