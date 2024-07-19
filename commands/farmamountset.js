const { SlashCommandBuilder } = require('discord.js');

module.exports = {


	data: new SlashCommandBuilder()
		.setName('farmamountset')
		.setDescription('Set the amount /farm gives on each server.')

};
