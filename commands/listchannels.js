const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('listchannels')
		.setDescription('View your servers linked channels.')

};
