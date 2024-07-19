// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

function help(data, server) {

    rconCommandStandalone(`whisper ${data.PlayerName} There is no help!`, servers[server-1]);
        
}


module.exports = help;
