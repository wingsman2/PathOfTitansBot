const index = require("../../app.js");
const config = require('../../config');
const db = require('better-sqlite3')(config.get('maininfo.db'));

const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');

function PlayerQuestCompleteWebhook(data, id, channel) {
    const client = index.Gbot;

    console.log(`Player Quest`);
    
    // Database handling
    const dataG = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.PlayerAlderonId);
    console.log(dataG);
    if (dataG) {
        db.prepare(`UPDATE users SET quests = quests + 1 WHERE alderon_id = ?;`).run(data.PlayerAlderonId);
    }
}

module.exports = PlayerQuestCompleteWebhook;
