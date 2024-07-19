const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('farmamountlist')
		.setDescription('View servers /farm values.')

};
