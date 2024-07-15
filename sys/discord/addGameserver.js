// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);

function addGameserver(interaction, ip, port, password) {


    const data = db.prepare(`SELECT servers FROM servers WHERE guildId = '${interaction.guildId}';`).get();
    console.log(`Adding Server IP:'${ip}' Port:'${port}' Pass:'${password}' ID:'${interaction.guildId}'`);
    console.log(`Data:'${data}'`);

    if (data) {

        let servers = JSON.parse(data.servers);
        servers.push({
            "ip": ip,
            "port": port,
            "password": password
        });
        let new_servers = JSON.stringify(servers);

        const dataX = db.prepare(`UPDATE servers SET servers = ? WHERE guildId = ?;`).run(new_servers, interaction.guildId);
        interaction.reply({content: `${interaction.user} Server has been added. Type /listgameserver to view your servers.`, ephemeral: true});



    } else {
        let servers = {
            "ip": ip,
            "port": port,
            "password": password
        };
        let new_servers = JSON.stringify(servers);

        const dataX = db.prepare(`INSERT INTO servers (servers, guildId) Values (servers = ?, guildId = ?);`).run(new_servers, interaction.guildId);
        interaction.reply({content: `${interaction.user} Server has been created and added. Type /listgameserver to view your servers.`, ephemeral: true});
    }
}

module.exports = addGameserver;
