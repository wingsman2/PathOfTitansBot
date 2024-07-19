// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);

function farmAmountSet(webid, amount) {


    const data = db.prepare(`SELECT farmamount FROM settings WHERE webid = '${webid}';`).get();

    if (data) {

        const dataX = db.prepare(`UPDATE farmamount SET farmamount = ? WHERE webid = ?;`).run(farmamount, webid);
        interaction.reply({content: `${interaction.user} Farm amount has been updated for server with webID: ${webid}. Type /farmamountlist to view current values.`, ephemeral: true});

    } else {
        const dataX = db.prepare(`INSERT INTO channels (webid, farmamount) Values (?, ?);`).run(webid, farmamount);
        interaction.reply({content: `${interaction.user} Farm amount has been set for server with webID: ${webid}. Type /farmamountlist to view current values.`, ephemeral: true});
    }
}

module.exports = farmAmountSet;
