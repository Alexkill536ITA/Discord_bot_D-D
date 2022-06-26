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
const color = require("ansi-colors");

module.exports = {
    name: 'meteo',
    description: "Motra Meteo",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute get_meteo');
        }
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        try {
            if (args[0] == 'set') {
                let myRole = message.guild.roles.cache.find(role => role.id === config.role_avance);
                if (message.member.roles.cache.some(r => config.role_avance.includes(r.id)) || message.author.id == config.owner) {
                    if (args[1] == 1 || args[1] == 2 || args[1] == 3 || args[1] == 4) {
                        if (args[1] == 1) {
                            var value = [1, 1]
                            globals_var.setMeteo(value);
                        } else if (args[1] == 2) {
                            var value = [1, 2]
                            globals_var.setMeteo(value);
                        } else if (args[1] == 3) {
                            var value = [1, 3]
                            globals_var.setMeteo(value);
                        } else if (args[1] == 4) {
                            var value = [1, 4]
                            globals_var.setMeteo(value);
                        }
                        var out = globals_var.getMeteo();
                        out.setThumbnail(botavatar.displayAvatarURL());
                        message.channel.send(out);
                    } else {
                        meteo.set_meteo_out();
                        var out = globals_var.getMeteo();
                        out.setThumbnail(botavatar.displayAvatarURL());
                        message.channel.send(out);
                    }
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                        .setTitle('Non sei autorizzato a usare questo comando');
                    message.channel.send(Container);
                }
            } else {
                let myRole = message.guild.roles.cache.find(role => role.id === config.role_base);
                if (message.member.roles.cache.some(r => config.role_base.includes(r.id)) || message.author.id == config.owner) {
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
                        .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                        .setTitle('Non sei autorizzato a usare questo comando');
                    message.channel.send(Container);
                }
            }
        } catch (error) {
            if (message.author.bot) {
                message.delete();
                return;
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autorizzato a usare questo comando');
                message.channel.send(Container);
                console.log(error);
            }
        }
    }
}
