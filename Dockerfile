FROM node:18-alpine
# mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /app
COPY package*.json ./
# USER node
ENV db="PotBotDB.db"
ENV discord_token=""
ENV bot_id=""
ENV guild_id="None"
ENV bot_name="SetMe"
ENV server_name="SetMe"
ENV server_url=""
RUN apk update && apk add npm
RUN npm install
RUN npm install sourcequery
COPY . .
EXPOSE 110
CMD [ "node", "app.js" ]
