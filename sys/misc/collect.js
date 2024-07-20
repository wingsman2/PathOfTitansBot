// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")

const collect_cooldown = new Set();
const collect_cooldownTime = 1200000;


function collect(data, server) {

    const dataG = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get(process.env.guild_id);
    if (dataG) {
        let servers = JSON.parse(dataG.servers);

        if (collect_cooldown.has(data.AlderonId)) {
            rconCommandStandalone(`whisper ${data.PlayerName} Please wait for the 20 minute cooldown to end before using the command again.`, servers[server-1]);
            return;
        } else {
            collect_cooldown.add(data.AlderonId);
            setTimeout(() => {
                collect_cooldown.delete(data.AlderonId);
            }, collect_cooldownTime);

            const dataS1 = db.prepare(`SELECT farmamount FROM settings WHERE webid = ?;`).get(server);
            if (dataS1){

            // Check if user is linked / unlinked
            const dataG2 = db.prepare(`SELECT discord_id FROM users WHERE alderon_id = ?;`).get(data.AlderonId);
            if (dataG2) {
                // Linked
                if (dataG2.discord_id !== 'None' && !dataG2.discord_id.includes('P')) {
                    rconCommandStandalone(`addmarks ${data.PlayerName} ${dataS1.farmamount}`, servers[server-1]);
                    rconCommandStandalone(`whisper ${data.PlayerName} :pot: You have collected ${dataS1.farmamount} Marks!`, servers[server-1]);
                } else {
                    rconCommandStandalone(`whisper ${data.PlayerName} :pot: Please link your Alderon account to our Discord by using /link in our Discord Server ${process.env.discordlink}.`, servers[server-1]);
                    return;
                }
            } else {
                rconCommandStandalone(`whisper ${data.PlayerName} :pot: Please link your Alderon account to our Discord by using /link in our Discord Server ${process.env.discordlink}.`, servers[server-1]);
                return;
            }

            } else {
                rconCommandStandalone(`whisper ${data.PlayerName} :pot: This server currently does not have /farm enabled.`, servers[server-1]);
            }


        }
        
    }
}

module.exports = collect;
