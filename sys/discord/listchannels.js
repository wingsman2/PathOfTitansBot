// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);

function listchannels(interaction) {


    const data = db.prepare(`SELECT servers FROM servers WHERE guildId = '${interaction.guildId}';`).get();

    if (data) {
        let servers = JSON.parse(data.servers);
        let serverList = '';
        serverList+=`**Your ${servers.length} Servers:**\n\n`;

        for (let i = 0; i < servers.length; i++) {
            const data2 = db.prepare(`SELECT * FROM channels WHERE guildId = '${interaction.guildId}' AND webid = '${servers[i].webid}';`).get();
            serverList+=`**Server ${i+1}**\nIP: \`${servers[i].ip}\`\nwebID: \`${servers[i].webid}\`\n`;
            serverList+=`activity_channel = ${data2.activity_channel}\n`;
            serverList+=`combat_channel = ${data2.combat_channel}\n`;
            serverList+=`admin_channel = ${data2.admin_channel}\n`;
            serverList+=`report_channel = ${data2.report_channel}\n`;
            serverList+=`chat_channel = ${data2.chat_channel}\n`;
            serverList+=`quest_channel = ${data2.quest_channel}\n`;
            serverList+=`moneylog_channel = ${data2.moneylog_channel}\n`;
            serverList+=`nesting_channel = ${data2.nesting_channel}\n\n`;
            //data2.forEach((dataX) => serverList+=dataX)
        }

        interaction.reply({content: serverList, ephemeral: true});

    }
}

module.exports = listchannels;
