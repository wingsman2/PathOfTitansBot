const index = require("../../app.js");
const config = require('../../config');
const db = require('better-sqlite3')(config.get('maininfo.db'));
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function strikeRemove(interaction, uid) {
    var dataG1 = db.prepare(`SELECT * FROM strikes WHERE uid = ?;`).get(uid);
    if (dataG1) {
        db.prepare(`DELETE FROM strikes WHERE uid=?;`).run(uid);
        interaction.reply({content: `${interaction.user} Strike **#${uid}** has been removed.`, ephemeral: false});
        return;
    } else {
        interaction.reply({content: `${interaction.user} Strike UID **#${uid}** not found. Type \`/strike-list Username/mention\` to view a list of their strikes.`, ephemeral: false});
        return;
    }
}


module.exports = strikeRemove;
  
