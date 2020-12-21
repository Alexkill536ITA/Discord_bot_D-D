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
        if (args[0] == 'set') {
            let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
            if(message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
                if (args[1] == 1 || args[1] == 2 || args[1] == 3 || args[1] == 4) {
                    if (args[1] == 1) {
                        Container.setColor(255,0,0).setThumbnail(botavatar.displayAvatarURL()).setTitle('🌐 Il Meteo giornaliero:').setDescription(':sunny: Sereno');
                    } else if (args[1] == 2) {
                        Container.setColor(255,0,0).setThumbnail(botavatar.displayAvatarURL()).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud: Nuvoloso');
                    } else if (args[1] == 3) {
                        Container.setColor(255,0,0).setThumbnail(botavatar.displayAvatarURL()).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_rain: Pioggia');
                    } else if (args[1] == 4) {
                        Container.setColor(255,0,0).setThumbnail(botavatar.displayAvatarURL()).setTitle('🌐 Il Meteo giornaliero:').setDescription(':cloud_snow: Nevicata');
                    }
                    message.channel.send(Container);
                } else {
                    meteo.set_meteo_out();
                    var out = globals_var.getMeteo();
                    out.setThumbnail(botavatar.displayAvatarURL());
                    message.channel.send(out);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                    .setTitle('Non sei autorizzato a usare questo comando');   
                message.channel.send(Container);
            }
        } else {
            let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
            if(message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
                var out = globals_var.getMeteo();
                var check_out = out['title'];
		        if (check_out == null) {
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
                    .setTitle('Non sei autorizzato a usare questo comando');   
                message.channel.send(Container);
            }
        }
         
    }
}
