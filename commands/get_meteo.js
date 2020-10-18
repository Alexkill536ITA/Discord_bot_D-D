/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const Discord = require('discord.js');
const globals_var = require('../script/globals_var.js');
const meteo = require('../script/set_meteo.js');
const config = require("../config.json");

module.exports = {
    name: 'meteo',
    description: "Motra Meteo",
    async execute(client, message, args) {
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == "Infinity Dice");
        if (args[0] && args[0] == 'set') {
            let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
            if(message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
                meteo.set_meteo_out();
                var out = globals_var.getMeteo();
                out.setThumbnail(botavatar.displayAvatarURL());
                message.channel.send(out);
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                    .setTitle('Non sei autoriazato a usare questo comando');   
                message.channel.send(Container);
            }
        } else {
            let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
            if(message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
                var out = globals_var.getMeteo();
                var check_out = out['title'];
                if (check_out == undefined) {
                    meteo.set_meteo_out();
                    var out = globals_var.getMeteo();
                    out.setThumbnail(botavatar.displayAvatarURL());
                    message.channel.send(out);
                } else {
                    out.setThumbnail(botavatar.displayAvatarURL());
                    message.channel.send(out);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                    .setTitle('Non sei autoriazato a usare questo comando');   
                message.channel.send(Container);
            }
        }
         
    }
}