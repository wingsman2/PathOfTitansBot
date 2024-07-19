// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);

function listGameserver(interaction) {


    const data = db.prepare(`SELECT servers FROM servers WHERE guildId = '${interaction.guildId}';`).get();

    if (data) {
        let servers = JSON.parse(data.servers);
        let serverList = '';
        serverList+=`**Your ${servers.length} Servers:**\n\n`;

        for (let i = 0; i < servers.length; i++) {
            serverList+=`**Server ${i+1}**\nIP: \`${servers[i].ip}\`\nRcon PORT: \`${servers[i].port}\`\nPASSWORD: \`${servers[i].password}\`\nwebID: \`${servers[i].webid}\`\nQuery Port: \`${servers[i].qport}\`\n\n`;
        }

        interaction.reply({content: serverList, ephemeral: true});

    }
}

module.exports = listGameserver;
