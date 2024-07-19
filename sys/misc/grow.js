// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

function grow(data, server) {
    const dataG1 = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get(process.env.guild_id);
    if (!dataG1) {
        return;
    }

    let servers = JSON.parse(dataG1.servers);
    let args = data.Message.split(' ');

    const dataG2 = db.prepare(`SELECT * FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
    if (!dataG2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: for some reason, you where not found in the servers database. Please log out and back in and try again.`, servers[server-1]);
        return;
    }
    if (dataG2.discord_id == 'None' || dataG2.discord_id.includes('P')) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Please link your Alderon account to our Discord by using /link in our Discord Server.`, servers[server-1]);
        return;
    }

    const dataG3 = db.prepare(`SELECT * FROM shop WHERE dinosaur = ?;`).get(dataG2.spawned);
    if (!dataG3) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: The dinosaur you are trying to buy a grow for is not in the shop.`, servers[server-1]);
        return;
    }

    let fullCost = Math.round(dataG3.cost);
    let stageCost = Math.round(dataG3.cost / 3);

    if (args.length !== 2) {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Command Usage: !grow <stage/full>.`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} ${dataG3.dinosaur} Full Cost: ${fullCost} ERA Coins, Stage Cost: ${stageCost} ERA Coins.`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} Use !deposit <amount> to convert Marks to ERA Coins.`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} Use !balance to view your balance at any time.`, servers[server-1]);
        return;
    }

    if (args[1] !== 'stage' && args[1] !== 'full') {
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Command Usage: !grow <stage/full>.`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} ${dataG3.dinosaur} Full Cost: ${fullCost} ERA Coins, Stage Cost: ${stageCost} ERA Coins.`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} Use !deposit <amount> to convert Marks to ERA Coins.`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} Use !balance to view your balance at any time.`, servers[server-1]);
        return;
    }

    if (args[1] == 'stage') {

        if (stageCost > dataG2.tokens) {
            rconCommandStandalone(`whisper ${data.PlayerName} :pot: You do not have the funds to buy a grow for this dinosaur.`, servers[server-1]);
            return;
        }

        db.prepare(`UPDATE users SET tokens = tokens - ? WHERE discord_id = ?;`).run(stageCost, dataG2.discord_id);
        rconCommandStandalone(`modattr ${data.PlayerName} Growth 0.25`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Bought a ${dataG3.dinosaur} growth stage for ${stageCost} ERA Coins.`, servers[server-1]);
        return;
    }

    if (args[1] == 'full') {

        if (fullCost > dataG2.tokens) {
            rconCommandStandalone(`whisper ${data.PlayerName} :pot: You do not have the funds to buy a grow for this dinosaur.`, servers[server-1]);
            return;
        }

        db.prepare(`UPDATE users SET tokens = tokens - ? WHERE discord_id = ?;`).run(fullCost, dataG2.discord_id);
        rconCommandStandalone(`setattr ${data.PlayerName} Growth 1`, servers[server-1]);
        rconCommandStandalone(`whisper ${data.PlayerName} :pot: Bought a ${dataG3.dinosaur} full growth for ${fullCost} ERA Coins.`, servers[server-1]);
        return;
    }





    
}


module.exports = grow;
