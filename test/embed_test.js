/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');

module.exports = {
    name: 'embed',
    description: "embed test",
    async execute(message, args){
        const embeds = [];
        for (let i = 1; i <= 5; ++i)
        embeds.push(new Discord.MessageEmbed().addField('Page', i));
        const Embeds = new Pagination.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(false)
        .setTitle('Test Title')
        .setThumbnail(message.author.displayAvatarURL())
        .addField("hello","STRUNZ")
        // .addField('\u200b', '\u200b')
        .setColor([255, 0, 0])
        .setDeleteOnTimeout(true);
        await Embeds.build();
    }
}