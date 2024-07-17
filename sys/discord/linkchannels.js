// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);

function linkchannels(interaction, webid, activity_channel, combat_channel, admin_channel, combat_channel, report_channel, chat_channel, quest_channel, moneylog_channel, nesting_channel) {


    const data = db.prepare(`SELECT * FROM channels WHERE guildId = '${interaction.guildId}' AND webid = '${webid}';`).get();

    if (data) {

        const dataX = db.prepare(`UPDATE channels SET activity_channel = ? combat_channel = ? admin_channel = ? combat_channel = ? report_channel = ? chat_channel = ? quest_channel = ? moneylog_channel = ? nesting_channel = ? WHERE guildId = ? AND webid = ?;`).run(activity_channel, combat_channel, admin_channel, combat_channel, report_channel, chat_channel, quest_channel, moneylog_channel, nesting_channel, interaction.guildId, webid);
        interaction.reply({content: `${interaction.user} Channels have been updated. Type /listchannels to view your channels.`, ephemeral: true});

    } else {
        const dataX = db.prepare(`INSERT INTO channels (guildId, webid, activity_channel, combat_channel, admin_channel, combat_channel, report_channel, chat_channel, quest_channel, moneylog_channel, nesting_channel) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`).run(interaction.guildId, webid, activity_channel, combat_channel, admin_channel, combat_channel, report_channel, chat_channel, quest_channel, moneylog_channel, nesting_channel);
        interaction.reply({content: `${interaction.user} Channels have been created. Type /listchannels to view your channels.`, ephemeral: true});
    }
}

module.exports = linkchannels;
