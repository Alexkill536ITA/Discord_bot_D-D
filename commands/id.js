/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: 'id',
    description: "get id user",
    execute(message, args){
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if(message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            Container.setColor([255, 0, 0]).setTitle('Il Tuo ID Utente Discord').setDescription(message.author.username+": "+message.author);
            message.author.send(Container);
            Container = new Discord.MessageEmbed();
            Container.setColor([255, 0, 0])
            .setTitle('Invio ID Utente Completato')
            .setDescription(`🆔 Richiesta di: ${message.author.username}`)
            .setTimestamp()
            .setFooter("Data", message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
            message.channel.send(Container);
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}