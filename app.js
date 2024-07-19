// IMPORTS ---------------------------------------------------------------------
const fs = require('fs');
const bodyParser = require("body-parser")

const { REST } = require('@discordjs/rest');
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder, GuildEmoji } = require('discord.js');
const token = process.env.discord_token;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const db = require('better-sqlite3')(`./sys/db/${process.env.db}`);
const cdb = require('./sys/setup/dbinit.js');
cdb.initdb();


const express = require("express");
const app = express();
const PORT = process.env.port;
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`>_ ${process.env.bot_name} Bot: Listening on port ${PORT}`));

const schedule = require('node-schedule');

// Webhooks
let PlayerChatWebhook = require('./sys/wh/PlayerChatWebhook.js');
let PlayerRespawnWebhook = require('./sys/wh/PlayerRespawnWebhook.js');
let PlayerLoginWebhook = require('./sys/wh/PlayerLoginWebhook.js');
let PlayerLogoutWebhook = require('./sys/wh/PlayerLogoutWebhook.js');
let PlayerReportWebhook = require('./sys/wh/PlayerReportWebhook.js');
let PlayerLeaveWebhook = require('./sys/wh/PlayerLeaveWebhook.js');
let PlayerQuestCompleteWebhook = require('./sys/wh/PlayerQuestCompleteWebhook.js');
let PlayerKilledWebhook = require('./sys/wh/PlayerKilledWebhook.js');
let AdminSpectateWebhook = require('./sys/wh/AdminSpectateWebhook.js');
let AdminCommandWebhook = require('./sys/wh/AdminCommandWebhook.js');

// Commands
let cmdCommand = require('./sys/pot/cmdCommand.js');

// Trivia
let triviaGenerate = require('./sys/pot/triviaGenerate.js');

// Online User update
let onlineUserUpdate = require('./sys/misc/onlineUserUpdate.js');
let restartAllServers = require('./sys/misc/restartAllServers.js');

// Rcon
let rconCommandStandalone = require('./sys/rcon/rconCommandStandalone.js');

const cooldown = new Set();
const cooldownTime = 1000; 


// Rcon Command ---------------------------------------------------------------------

// Discord Command ---------------------------------------------------------------------
let addGameserver = require('./sys/discord/addGameserver.js');
let farmAmountSet = require('./sys/discord/farmAmountSet.js');
let farmAmountList = require('./sys/discord/farmAmountList.js');
let linkChannels = require('./sys/discord/linkChannels.js');
let listChannels = require('./sys/discord/listChannels.js');
let listGameserver = require('./sys/discord/listGameserver.js');
let removeGameserver = require('./sys/discord/removeGameserver.js');
let linkAlderonAccount = require('./sys/discord/linkAlderonAccount.js');
let unlink = require('./sys/discord/unlink.js');
let viewProfile = require('./sys/discord/viewProfile.js');
let viewLeaderboard = require('./sys/discord/viewLeaderboard.js');
let addTokens = require('./sys/discord/addTokens.js');
let addTokensAll = require('./sys/discord/addTokensAll.js');
let removeTokens = require('./sys/discord/removeTokens.js');
let setTokens = require('./sys/discord/setTokens.js');

let strikeAdd = require('./sys/discord/strikeAdd.js');
let strikeList = require('./sys/discord/strikeList.js');
let strikeRemove = require('./sys/discord/strikeRemove.js');

let redeemAdd = require('./sys/discord/redeemAdd.js');
let redeemList = require('./sys/discord/redeemList.js');
let redeemRemove = require('./sys/discord/redeemRemove.js');

let createNest = require('./sys/discord/createNest.js');
let nestRequest = require('./sys/discord/nestRequest.js');

let triviaAdd = require('./sys/discord/triviaAdd.js');
let triviaList = require('./sys/discord/triviaList.js');
let triviaRemove = require('./sys/discord/triviaRemove.js');

let shopItemAdd = require('./sys/discord/shopItemAdd.js');
let viewShop = require('./sys/discord/viewShop.js');
let shopItemRemove = require('./sys/discord/shopItemRemove.js');

let help = require('./sys/discord/help.js');


// Remove nests and invites when bot starts
db.prepare(`DELETE FROM invites;`).run();
db.prepare(`DELETE FROM nests;`).run();
// client.users.cache.get('767310404003037215').send('Bot has restarted. Cleared all nests and invites.');



// Scheduled Events ---------------------------------------------------------------------

// Webhooks
// Server 1 webhooks

//let whnum = db.prepare(`SELECT servernum FROM servers WHERE guildId = ?;`).get(process.env.guild_id);

app.post(`/${process.env.bot_name}/PlayerChat/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT chat_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	PlayerChatWebhook(req.body, req.params.id, whnum.chat_channel);
	console.log(req.body);
});
app.post(`/${process.env.bot_name}/PlayerKilled/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT combat_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	PlayerKilledWebhook(req.body, req.params.id, whnum.combat_channel);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/PlayerLogin/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT activity_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	PlayerLoginWebhook(req.body, req.params.id, whnum.activity_channel);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/PlayerLogout/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT activity_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	PlayerLogoutWebhook(req.body, req.params.id, whnum.activity_channel);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/PlayerRespawn/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT activity_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	PlayerRespawnWebhook(req.body, req.params.id, whnum.activity_channel);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/PlayerLeave/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT activity_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	PlayerLeaveWebhook(req.body, req.params.id, whnum.activity_channel);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/PlayerReport/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT report_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	var refID = Math.random().toString(36).substr(2, 6).toUpperCase();
	PlayerReportWebhook(req.body, req.params.id, whnum.report_channel, refID);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/PlayerQuestComplete/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT quest_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	console.log(req.body);
	PlayerQuestCompleteWebhook(req.body, req.params.id, whnum.quest_channel);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/AdminSpectate/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT admin_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	AdminSpectateWebhook(req.body, req.params.id, whnum.admin_channel);
	console.log(req.body);

});
app.post(`/${process.env.bot_name}/AdminCommand/:id`, (req, res) => { //
	res.status(200).end()
	let whnum = db.prepare(`SELECT admin_channel FROM channels WHERE webid = '${req.params.id}';`).get();
	AdminCommandWebhook(req.body, req.params.id, whnum.admin_channel);
	console.log(req.body);
});


// Trivia
//schedule.scheduleJob('0 0 * * * *', function(){
schedule.scheduleJob('0 */5 * * * *', function(){
	triviaGenerate();
});

schedule.scheduleJob('0 */5 * * * *', function(){
	onlineUserUpdate();
});

//schedule.scheduleJob('0 0 */5 * * *', function(){

//	restartAllServers();

//});

// Initialization ---------------------------------------------------------------------

client.on('ready', () => {
	console.log(`${process.env.bot_name}'s bot is online!`);
});

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const clientId = process.env.bot_id;
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		)
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(`ERROR UPLOADING COMMANDS!\n`+error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (interaction.user.bot) { return; }
	if (!interaction.channel) { return; }

	if (cooldown.has(interaction.user.id)) {
		interaction.member.send("**Please wait a moment before using commands again.**");
		return;
	}


	if (interaction.customId == 'hatch') {
		nestRequest(interaction);
	}


	if (!interaction.isChatInputCommand()) { return };
	const { commandName } = interaction;
    if (commandName === 'cmd') {
		let server = interaction.options.getInteger('server') ?? 1;
		let command = interaction.options.getString('command');
		cmdCommand(command, server, interaction);
	}


    // Discord Commands
    if (commandName === 'addgameserver') {
		let ip = interaction.options.getString('ip');
		let port = interaction.options.getString('port');
		let password = interaction.options.getString('password');
		let qport = interaction.options.getString('qport');
		addGameserver(interaction, ip, port, password, qport);
	}

    else if (commandName === 'linkchannels') {
	        let webid = interaction.options.getString('webid');
		let activity_channel = interaction.options.getString('activity_channel');
		let combat_channel = interaction.options.getString('combat_channel');
	        let admin_channel = interaction.options.getString('admin_channel');
		let report_channel = interaction.options.getString('report_channel');
		let chat_channel = interaction.options.getString('chat_channel');
	        let quest_channel = interaction.options.getString('quest_channel');
		let moneylog_channel = interaction.options.getString('moneylog_channel');
		let nesting_channel = interaction.options.getString('nesting_channel');
	    
		linkChannels(interaction, webid, activity_channel, combat_channel, admin_channel, report_channel, chat_channel, quest_channel, moneylog_channel, nesting_channel);
	}

    else if (commandName === 'listgameserver') {
		listGameserver(interaction);
	}

    else if (commandName === 'listchannels') {
		listChannels(interaction);
	}

    else if (commandName === 'farmamountset') {
	    let webid = interaction.options.getString('webid');
	    let amount = interaction.options.getString('amount');
		listChannels(interaction, webid, amount);
	}

    else if (commandName === 'farmamountlist') {
		listChannels(interaction);
	}

    else if (commandName === 'removegameserver') {
		let server = interaction.options.getInteger('server');
		removeGameserver(interaction, server);
	}

	else if (commandName === 'link') {
		let id = interaction.options.getString('alderon_id');
		linkAlderonAccount(interaction, id);
	}

	else if(commandName == 'unlink') {
		let name = interaction.options.getString('name');
		unlink(interaction, name)
	}

	else if (commandName === 'profile') {
		let name = interaction.options.getString('name') ?? 'self';
		viewProfile(interaction, name);
	}

	else if (commandName === 'leaderboard') {
		let category = interaction.options.getString('category');
		viewLeaderboard(interaction, category);
	}

	else if (commandName === 'ec-add') {
		let name = interaction.options.getString('name') ?? 'self';
		let amount = interaction.options.getInteger('amount');
		addTokens(interaction, name, amount);
	}

	else if (commandName === 'ec-remove') {
		let name = interaction.options.getString('name') ?? 'self';
		let amount = interaction.options.getInteger('amount');
		removeTokens(interaction, name, amount);
	}

	else if (commandName === 'ec-set') {
		let name = interaction.options.getString('name') ?? 'self';
		let amount = interaction.options.getInteger('amount');
		setTokens(interaction, name, amount);
	}

	else if (commandName === 'ec-add-all') {
		let amount = interaction.options.getInteger('amount');
		addTokensAll(interaction, amount);
	}

	else if (commandName === 'strike-add') {
		let name = interaction.options.getString('name');
		let reason = interaction.options.getString('reason');
		let category = interaction.options.getString('category');
		strikeAdd(interaction, name, reason, category);
	}

	else if (commandName === 'strike-list') {
		let name = interaction.options.getString('name');
		strikeList(interaction, name);
	}

	else if (commandName === 'strike-remove') {
		let uid = interaction.options.getInteger('uid');
		strikeRemove(interaction, uid);
	}

	else if (commandName === 'nest') {
		let partner = interaction.options.getUser('partner');
		let eggs = interaction.options.getInteger('eggs');
		let description = interaction.options.getString('description');
		let gender = interaction.options.getString('gender');
		const attachment = interaction.options.getAttachment("image") ?? 'none';
		const url = attachment.url;

		createNest(interaction, partner, eggs, description, gender, url);
	}

	else if (commandName === 'trivia-add') {
		let question = interaction.options.getString('question');
		let answer = interaction.options.getString('answer');
		let marks = interaction.options.getString('marks');
		triviaAdd(interaction, question, answer, marks);
	}

	else if (commandName === 'trivia-list') {
		triviaList(interaction);
	}

	else if (commandName === 'trivia-remove') {
		let uid = interaction.options.getInteger('uid');
		triviaRemove(interaction, uid);
	}

	else if (commandName === 'shop-item-add') {
		let dinosaur = interaction.options.getString('dinosaur');
		let cost = interaction.options.getInteger('cost');
		shopItemAdd(interaction, dinosaur, cost);
	}

	else if (commandName === 'shop-item-remove') {
		let dinosaur = interaction.options.getString('dinosaur');
		shopItemRemove(interaction, dinosaur);
	}

	else if (commandName === 'redeem-add') {
		let name = interaction.options.getString('name');
		let dinosaur = interaction.options.getString('dinosaur');
		let growth = interaction.options.getNumber('growth');
		redeemAdd(interaction, name, dinosaur, growth);
	}

	else if (commandName === 'redeem-remove') {
		let uid = interaction.options.getInteger('uid');
		redeemRemove(interaction, uid);
	}

	else if (commandName === 'redeem-list') {
		let name = interaction.options.getString('name');
		redeemList(interaction, name);
	}

	

	else if (commandName === 'shop') {
		viewShop(interaction);
	}

	else if (commandName === 'help') {
		help(interaction);
	}









	cooldown.add(interaction.user.id);
	setTimeout(() => {
		cooldown.delete(interaction.user.id);
	}, cooldownTime);


});



client.login(token);
module.exports.Gbot = client;

