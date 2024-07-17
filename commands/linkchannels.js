const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('linkchannels')
		.setDescription('Link Discord Server Channels. Type None if you dont want to link the channel')
		.addStringOption(option =>
			option.setName('webid')
				.setDescription('The webID of the server provided when adding server or in /listgameserver')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('activity_channel')
				.setDescription('Activity Reports')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('combat_channel')
				.setDescription('Combat Reports')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('admin_channel')
				.setDescription('Admin Actions Reports')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('report_channel')
				.setDescription('In Game Reports')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('chat_channel')
				.setDescription('Chat')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('quest_channel')
				.setDescription('Quest Reports')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('moneylog_channel')
				.setDescription('Bot currency Reports')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('nesting_channel')
				.setDescription('Nesting Channel')
				.setRequired(true))
};
