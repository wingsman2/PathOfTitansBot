// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);

function listChannels(interaction) {


    const data = db.prepare(`SELECT servers FROM servers WHERE guildId = '${interaction.guildId}';`).get();

    if (data) {
        let servers = JSON.parse(data.servers);
        let serverList = '';
        serverList+=`**Your ${servers.length} Servers:**\n\n`;

        for (let i = 0; i < servers.length; i++) {
            const data2 = db.prepare(`SELECT * FROM channels WHERE guildId = '${interaction.guildId}' AND webid = '${servers[i].webid}';`).get();
            if(data2){
            serverList+=`**Server ${i+1}**\nIP: \`${servers[i].ip}\`\nwebID: \`${servers[i].webid}\`\n`;
            serverList+=`activity_channel = ${data2.activity_channel}\n`;
            serverList+=`combat_channel = ${data2.combat_channel}\n`;
            serverList+=`admin_channel = ${data2.admin_channel}\n`;
            serverList+=`report_channel = ${data2.report_channel}\n`;
            serverList+=`chat_channel = ${data2.chat_channel}\n`;
            serverList+=`quest_channel = ${data2.quest_channel}\n`;
            serverList+=`moneylog_channel = ${data2.moneylog_channel}\n`;
            serverList+=`nesting_channel = ${data2.nesting_channel}\n\n`;
            serverList+=`PlayerChatWebhook = /${process.env.bot_name}/PlayerChat/${servers[i].webid}\n`;
            serverList+=`PlayerKilledWebhook = /${process.env.bot_name}/PlayerKilled/${servers[i].webid}\n`;
            serverList+=`PlayerLoginWebhook = /${process.env.bot_name}/PlayerLogin/${servers[i].webid}\n`;
            serverList+=`PlayerLogoutWebhook = /${process.env.bot_name}/PlayerLogout/${servers[i].webid}\n`;
            serverList+=`PlayerRespawnWebhook = /${process.env.bot_name}/PlayerRespawn/${servers[i].webid}\n`;
            serverList+=`PlayerLeaveWebhook = /${process.env.bot_name}/PlayerLeave/${servers[i].webid}\n`;
            serverList+=`PlayerReportWebhook = /${process.env.bot_name}/PlayerReport/${servers[i].webid}\n`;
            serverList+=`PlayerQuestCompleteWebhook = /${process.env.bot_name}/PlayerQuestComplete/${servers[i].webid}\n`;
            serverList+=`AdminSpectateWebhook = /${process.env.bot_name}/AdminSpectate/${servers[i].webid}\n`;
            serverList+=`AdminCommandWebhook = /${process.env.bot_name}/AdminCommand/${servers[i].webid}\n\n`;
            } else {
            serverList+=`No channels found! Please setup channels with /linkchannels\n\n`;
            }
            //data2.forEach((dataX) => serverList+=dataX)
        }

        interaction.reply({content: serverList, ephemeral: true});

    }
}

module.exports = listChannels;
