exports.initdb = function(){
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const statements = [
`CREATE TABLE IF NOT EXISTS "invites" (
	"uid"	INTEGER NOT NULL,
	"message"	TEXT,
	"alderon_name"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "nests" (
	"uid"	INTEGER NOT NULL,
	"message"	TEXT,
	"server_id"	INTEGER,
	"creator"	TEXT,
	"partner"	TEXT,
	"eggs"	INTEGER,
	"description"	TEXT,
	"image"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "redeem" (
	"uid"	INTEGER NOT NULL,
	"alderon_name"	TEXT,
	"code"	TEXT,
	"dinosaur"	TEXT,
	"growth"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "servers" (
	"uid"	INTEGER NOT NULL,
	"guildId"	TEXT,
	"servers"	TEXT NOT NULL DEFAULT '[]',
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "settings" (
	"uid"	INTEGER NOT NULL,
	"webid"	INTEGER,
	"variables"	TEXT NOT NULL DEFAULT '[]',
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "channels" (
	"uid"	INTEGER NOT NULL,
	"guildId"	TEXT,
 	"webid"	INTEGER,
	"activity_channel"	TEXT NOT NULL DEFAULT 'None',
 	"combat_channel"	TEXT NOT NULL DEFAULT 'None',
  	"admin_channel"	TEXT NOT NULL DEFAULT 'None',
   	"report_channel"	TEXT NOT NULL DEFAULT 'None',
    	"chat_channel"	TEXT NOT NULL DEFAULT 'None',
     	"quest_channel"	TEXT NOT NULL DEFAULT 'None',
      	"moneylog_channel"	TEXT NOT NULL DEFAULT 'None',
       	"nesting_channel"	TEXT NOT NULL DEFAULT 'None',
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "shop" (
	"uid"	INTEGER NOT NULL,
	"dinosaur"	TEXT,
	"cost"	INTEGER,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "strikes" (
	"uid"	INTEGER NOT NULL,
	"alderon_id"	TEXT,
	"reason"	TEXT DEFAULT 'None',
	"category"	TEXT DEFAULT 'Community',
	"date"	INTEGER,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "trivia" (
	"uid"	INTEGER,
	"question"	TEXT,
	"answer"	TEXT,
	"active"	INTEGER DEFAULT 0,
	"marks"	INTEGER,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "users" (
	"uid"	INTEGER NOT NULL,
	"alderon_name"	TEXT,
	"alderon_id"	TEXT,
	"discord_id"	TEXT DEFAULT 'None',
	"tokens"	INTEGER DEFAULT 0,
	"online"	TEXT DEFAULT 'No',
	"spawned"	TEXT DEFAULT 'No',
	"server_id"	INTEGER DEFAULT 0,
	"online_time"	INTEGER DEFAULT 0,
	"messages"	INTEGER DEFAULT 0,
	"quests"	INTEGER DEFAULT 0,
	"kills"	INTEGER DEFAULT 0,
	"deaths"	INTEGER DEFAULT 0,
	"offspring"	INTEGER DEFAULT 0,
	"login_time"	INTEGER DEFAULT 0,
	"last_seen"	INTEGER,
	"last_farm"	INTEGER DEFAULT 0,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`,

`CREATE TABLE IF NOT EXISTS "worldevents" (
	"uid"	INTEGER NOT NULL,
	"type"	TEXT NOT NULL DEFAULT 'None',
	"alderon_name"	TEXT,
	"alderon_id"	TEXT,
	"time"	INTEGER,
	"coordinate"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
)`
];

  for (const stmt of statements) {
	  const cmd = db.prepare(stmt);
	  cmd.run();
  };

	return 0;
}
