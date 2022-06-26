/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");
const setconfig = require("../tools/Confing_edit.js");
// const reboot_bot = require("./restart_bot.js"); 
const color = require("ansi-colors");

module.exports = {
    name: 'setconfig',
    description: "set config",
    execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute set_config');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.id === config.role_admin);
        try {
            if (message.member.roles.cache.some(r => config.role_admin.includes(r.id)) || message.author.id == config.owner) {
                if (args[0] == "prefix") {
                    var myregexp = /^[a-zA-Z0-9]+$/;
                    if (myregexp.test(args[1]) == false) {
                        setconfig.set_prefix(args[1]);
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig prefix`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig prefix [Prefix nuovo]');
                        message.channel.send(Container);
                    }
                } else if (args[0] == "event_meteo_enable") {
                    boll = args[1].toLowerCase();
                    boll = (boll === 'true');
                    if (boll == true || boll == false) {
                        setconfig.set_event_meteo_enable(boll);
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig event_meteo_enable`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig event_meteo_enable [true/false]');
                        message.channel.send(Container);
                    }
                } else if (args[0] == "ora_event_meteo") {
                    if (args[1].length == 5) {
                        setconfig.set_ora_event(args[1]);
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig ora_event_meteo`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig ora_event_meteo [hh:mm]');
                        message.channel.send(Container);
                    }
                } else if (args[0] == "chat_event_meteo") {
                    if (args[1].length > 0 && args[1].length <= 18 && isNaN(parseInt(args[1])) == false) {
                        setconfig.set_chat_event(args[1]);
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig chat_event_meteo`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig chat_event_meteo [ID TextChat]');
                        message.channel.send(Container);
                    }
                } else if (args[0] == "random_color") {
                    boll = args[1].toLowerCase();
                    boll = (boll === 'true');
                    if (boll == true || boll == false) {
                        setconfig.set_random_color(boll);
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig random_color`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig random_color [true/false]');
                        message.channel.send(Container);
                    }
                } else if (args[0] == "pbc_min_char") {
                    if (isNaN(int(args[1])) == false) {
                        setconfig.Level_Chat_min_char = args[1]
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig pbc_min_char`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig pbc_min_char [Valore]');
                        message.channel.send(Container);
                    }
                } else if (args[0] == "pbc_level_max") {
                    if (isNaN(int(args[1])) == false) {
                        setconfig.set_Level_Chat_max = args[1]
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig pbc_level_max`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig pbc_level_max [Valore]');
                        message.channel.send(Container);
                    }
                } else if (args[0] == "pbc_chat_reset") {
                    boll = args[1].toLowerCase();
                    boll = (boll === 'true');
                    if (boll == true || boll == false) {
                        setconfig.set_Level_Chat_reset(boll)
                        // reboot_bot.execute(client, message, args);
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando setconfig pbc_chat_reset`)
                            .setTitle('Sintassi **' + config.prefix + 'setconfig pbc_chat_reset [true/false]');
                        message.channel.send(Container);
                    }
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando setconfig`)
                        .setTitle('Sintassi:\n **' + config.prefix + 'setconfig** [Opzione][Valore]');
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autoriazato a usare questo comando');
                message.channel.send(Container);
            }
        } catch (error) {
            if (message.author.bot) {
                message.delete()
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