var Rcon = require('rcon');
const index = require("../../app.js")
const rconCommand = require("../rcon/rconCommand.js")
const rconCommandStandalone = require("../rcon/rconCommandStandalone.js")
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);


function triviaGenerate() {

  var dataCH = db.prepare(`SELECT * FROM trivia WHERE NOT active = 0 `).run();
  console.log(dataCH);
  console.log("no trivia");
  if (0){
  var dataG1 = db.prepare(`UPDATE trivia SET active = 0;`).run();
  

  const data = db.prepare(`SELECT servers FROM servers WHERE guildId = ?;`).get(process.env.guild_id);
  if (data) {
      let servers = JSON.parse(data.servers);

        for (let i = 0; i < servers.length; i++) {


            var dataG1 = db.prepare(`SELECT * FROM trivia WHERE active = 0;`).all();
            if (dataG1) {
              
              var q = dataG1[Math.floor(Math.random()*dataG1.length)];

              rconCommandStandalone(`announce Trivia Time! Question: ${q.question}`, servers[i])
              var change = db.prepare(`UPDATE trivia SET active = ? WHERE question = ?;`).run(i+1, q.question);

              console.log(change);
            }
        }

  }
  }


}
module.exports = triviaGenerate;
