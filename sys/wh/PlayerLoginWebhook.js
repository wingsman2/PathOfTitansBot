const index = require("../../app.js");
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function PlayerLoginWebhook(data, webid, channel) {
    const client = index.Gbot;
    var activityChannel = client.channels.cache.get(channel);

    const joinEmbed = new EmbedBuilder();
    joinEmbed.setDescription(`**[${webid}] ${data.PlayerName}** \`${data.AlderonId}\` Joined **${data.ServerName}**`);
    joinEmbed.setTimestamp()
    if (data.bServerAdmin) { joinEmbed.setColor(`ffc800`); } else { joinEmbed.setColor(`00FF00`); }
    activityChannel.send({ embeds: [joinEmbed] });

    // Database handling
    const dataG = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
    console.log(dataG);



    if (!dataG) {
        const dataS = db.prepare(`INSERT INTO users (alderon_name, alderon_id, online, spawned, webid, login_time, last_seen) VALUES (?, ?, ?, ?, ?, ?, ?);`).run(data.PlayerName, data.AlderonId, 'Yes', 'None', webid, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000));
    } else {
        const dataS = db.prepare(`UPDATE users SET online = 'Yes', spawned = 'None', webid = ?, login_time = ?, last_seen = ? WHERE alderon_id = ?;`).run(webid, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000),  data.AlderonId);
    
    }

    
    

}

module.exports = PlayerLoginWebhook;
