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
    name: 'ping',
    description: "command ping",
    execute(message, args){
        const ping = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_admin);
        if(message.member.roles.cache.some(r => config.role_admin.includes(r.name)) || message.author.id == config.owner) {
            ping.setColor([255, 0, 0]).setTitle('pong');
            message.channel.send(ping);
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}