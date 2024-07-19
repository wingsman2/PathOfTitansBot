// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);

function farmAmountList(interaction) {


    const data = db.prepare(`SELECT servers FROM servers WHERE guildId = '${interaction.guildId}';`).get();

    if (data) {
        let servers = JSON.parse(data.servers);
        let serverList = '';
        serverList+=`**Your ${servers.length} Servers:**\n\n`;

        for (let i = 0; i < servers.length; i++) {
            const data2 = db.prepare(`SELECT * FROM settings WHERE webid = '${servers[i].webid}';`).get();
            if(data2){
            serverList+=`**Server ${i+1}**\nIP: \`${servers[i].ip}\`\nwebID: \`${servers[i].webid}\`\n`;
            serverList+=`/farm command gives = ${data2.farmamount}\n\n`;
            } else {
            serverList+=`/farm command is not set for ${servers[i].ip} webID: ${servers[i].webid} ! Please set /farm value with /farmamountset\n\n`;
            }
            //data2.forEach((dataX) => serverList+=dataX)
        }

        interaction.reply({content: serverList, ephemeral: true});

    }
}

module.exports = farmAmountList;
