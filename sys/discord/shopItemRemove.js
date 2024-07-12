const config = require('config');
const db = require('better-sqlite3')(config.get('maininfo.db'));
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function shopItemRemove(interaction, dinosaur) {
        var dataX = db.prepare(`DELETE FROM shop WHERE dinosaur = ?`).run(dinosaur);
        console.log(dataX);
        if (dataX.changes !== 0) {
                interaction.reply({content: `${interaction.user} Removed ${dinosaur} from the shop.`, ephemeral: true});
                return;
        } else {
                interaction.reply({content: `${interaction.user} Could not find "${dinosaur}" in the shop database.`, ephemeral: true});
                return;
        }
}


module.exports = shopItemRemove;
  
