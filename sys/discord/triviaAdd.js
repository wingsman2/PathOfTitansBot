

// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function triviaAdd(interaction, question, answer, marks) {
        db.prepare(`INSERT INTO trivia (question, answer, marks) VALUES (?, ?, ?);`).run(question, answer, marks);
        interaction.reply({content: `${interaction.user} Added the question to trivia list.`, ephemeral: true});
        return;
}


module.exports = triviaAdd;
  
