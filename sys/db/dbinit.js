const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
exports.initdb = function(){
db.run(`
       CREATE DATABASE IF NOT EXISTS "NyghtPotBot";
;

CREATE TABLE IF NOT EXISTS "invites" (
	"uid"	INTEGER NOT NULL,
	"message"	TEXT,
	"alderon_name"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "nests" (
	"uid"	INTEGER NOT NULL,
	"message"	TEXT,
	"server_id"	INTEGER,
	"creator"	TEXT,
	"partner"	TEXT,
	"eggs"	INTEGER,
	"description"	TEXT,
	"image"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "oldusers" (
	"uid"	INTEGER NOT NULL,
	"alderon_name"	TEXT,
	"alderon_id"	TEXT,
	"discord_id"	TEXT,
	"marks"	TEXT,
	"tokens"	INTEGER,
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS oldusersdrz(
   alderon_name VARCHAR(18) NOT NULL
  ,alderon_id   VARCHAR(11) NOT NULL
  ,discord_id   VARCHAR(21) NOT NULL
  ,marks        INTEGER  NOT NULL
  ,tokens       INTEGER  NOT NULL
);

CREATE TABLE IF NOT EXISTS "redeem" (
	"uid"	INTEGER NOT NULL,
	"alderon_name"	TEXT,
	"code"	TEXT,
	"dinosaur"	TEXT,
	"growth"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "servers" (
	"uid"	INTEGER NOT NULL,
	"guildId"	TEXT,
	"servers"	TEXT NOT NULL DEFAULT '[]',
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "shop" (
	"uid"	INTEGER NOT NULL,
	"dinosaur"	TEXT,
	"cost"	INTEGER,
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "strikes" (
	"uid"	INTEGER NOT NULL,
	"alderon_id"	TEXT,
	"reason"	TEXT DEFAULT 'None',
	"category"	TEXT DEFAULT 'Community',
	"date"	INTEGER,
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "trivia" (
	"uid"	INTEGER,
	"question"	TEXT,
	"answer"	TEXT,
	"active"	INTEGER DEFAULT 0,
	PRIMARY KEY("uid" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "users" (
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
);

CREATE TABLE IF NOT EXISTS "worldevents" (
	"uid"	INTEGER NOT NULL,
	"type"	TEXT NOT NULL DEFAULT 'None',
	"alderon_name"	TEXT,
	"alderon_id"	TEXT,
	"time"	INTEGER,
	"coordinate"	TEXT,
	PRIMARY KEY("uid" AUTOINCREMENT)
);
`,
      function(error){
        console.log("DBinitiated");
    }
      );
	return 0;
}
