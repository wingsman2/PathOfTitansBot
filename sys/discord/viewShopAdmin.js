

// Import database
const db = require('better-sqlite3')(`sys/db/${process.env.db}`);
const { Client, Collection, GatewayIntentBits, Routes, EmbedBuilder } = require('discord.js');


function viewShop(interaction) {
        var dataG1 = db.prepare(`SELECT * FROM shop`).all();
        if (dataG1.length !== 0) {

                const shopEmbed = new EmbedBuilder()
                shopEmbed.setTimestamp();
                shopEmbed.setColor('#0a0a0a');
                shopEmbed.setTitle(`${process.env.server_name} Shop`);
              
                shopEmbed.setThumbnail('https://i.imgur.com/ku4iwLR.png');
                shopEmbed.setFooter({ text: `${process.env.server_name}`, iconURL: 'https://i.imgur.com/ku4iwLR.png' });
                shopEmbed.setURL(`${process.env.server_url}`);

                shopEmbed.addFields(
                        { name: `ID`, value: `-----` , inline: true },
                        { name: `Dinosaur`, value: `-----` , inline: true },
                        { name: `Cost`, value: `-----` , inline: true },)

                console.log(shopEmbed.data.fields);

                for (let i = 0; i < dataG1.length; i++) {
                        
                        
                        shopEmbed.data.fields[0].value += `\n${dataG1[i].uid}`;
                        shopEmbed.data.fields[1].value += `\n${dataG1[i].dinosaur}`;
                        shopEmbed.data.fields[2].value += `\n${dataG1[i].cost}`;
                        
                }

                interaction.reply({embeds: [shopEmbed], ephemeral: true});



        } else {
                interaction.reply({content: `${interaction.user} Uh oh! Seems like the store is empty!`, ephemeral: true});
                return;
        }
}


module.exports = viewShop;
  
