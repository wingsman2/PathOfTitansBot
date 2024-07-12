

// Import database
const config = require('config');
const db = require('better-sqlite3')(config.get('maininfo.db'));
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function triviaAdd(interaction, question, answer) {
        db.prepare(`INSERT INTO trivia (question, answer) VALUES (?, ?);`).run(question, answer);
        interaction.reply({content: `${interaction.user} Added the question to trivia list.`, ephemeral: true});
        return;
}


module.exports = triviaAdd;
  
