FROM node:18-alpine
# mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /app
COPY package*.json ./
# USER node
ENV db="NyghtPotBot.db"
ENV discord_token=""
ENV bot_id=""
ENV activity_channel_id="None"
ENV combat_channel_id="None"
ENV admin_channel_id="None"
ENV report_channel_id="None"
ENV chat_channel_id="None"
ENV quest_channel_id="None"
ENV moneylog_channel_id="None"
ENV guild_id="None"
ENV nesting_channel_id="None"
ENV server_name="SetMe"
RUN apk update && apk add npm
RUN npm install
RUN npm install sourcequery
COPY . .
EXPOSE 110
CMD [ "node", "app.js" ]
