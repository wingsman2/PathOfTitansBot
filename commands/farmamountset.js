const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('farmamountset')
		.setDescription('Set the amount /farm gives on each server.')
		.addStringOption(option =>
			option.setName('webid')
				.setDescription('The webID of the server provided in /listgameserver')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('Amount of credits')
				.setRequired(true))
};
