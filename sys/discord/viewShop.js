

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
                shopEmbed.setURL(`${process.env.server_url)`);


                console.log(shopEmbed.data.fields);
                let descTxt = '';
                for (let i = 0; i < dataG1.length; i++) {
                        
                        

                        descTxt += `\n${dataG1[i].dinosaur} — :coin:${dataG1[i].cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                        
                }
                shopEmbed.setDescription(descTxt);


                interaction.reply({embeds: [shopEmbed], ephemeral: false});



        } else {
                interaction.reply({content: `${interaction.user} Uh oh! Seems like the store is empty!`, ephemeral: false});
                return;
        }
}


module.exports = viewShop;
  
