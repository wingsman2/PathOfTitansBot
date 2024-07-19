// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

function help(data, server) {

    let servers = JSON.parse(dataG1.servers);
    rconCommandStandalone(`whisper ${data.PlayerName} !help - Displays ingame commands`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !balance - shows current ERA and marks balances.`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !grow <stage/full> - Allows you to buy growth for ERA if your dino is setup in the store.`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !farm - command that can be run every 20mins to gain marks if set.`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !deposit <value> - Transfer Marks to ERA.`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !withdraw <value> - Transfer ERA to Marks.`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !accept - accept a nest invitation.`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !deny - deny a nest invitation.`, servers[server-1]);
    rconCommandStandalone(`whisper ${data.PlayerName} !redeem <code> - redeemable codes for dino growth.`, servers[server-1]);
        
}


module.exports = help;
