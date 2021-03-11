/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const { MongoClient } = require("mongodb");
const Discord = require('discord.js');
const methodDB = require("../mongodb_controll");
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'milestone',
    description: "Aggiungi o togli Milestone",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute add_sub_exp');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0] == "add" || args[0] == "-a") {
                if (args[2]) {
                    if (args[1] && args[2].length == 24) {
                        if (isNaN(parseInt(args[1]))) {
                            emit_print(message);
                        } else {
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {
                                methodDB.settab_db("Schede_PG");
                                var cursor = methodDB.serachbyid(args[2]);
                                cursor.then(function (result) {
                                    if (result != null) {
                                        var old_value = result[0].Exp;
                                        var new_value = old_value + parseInt(args[1]);
                                        methodDB.exp_update(result[0]._id, new_value);
                                        LevelUP_auto(message, result[0].Nome_Discord, result[0]._id, new_value);
                                        let member = message.guild.members.cache.get(result[0].Nome_Discord);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(colrs_set)
                                            .setTitle('Scheda: ' + result[0].Nome_PG)
                                            .setThumbnail(member.user.displayAvatarURL(), true)
                                            .addField("Milestone: ", new_value)
                                            .setTimestamp()
                                            .setFooter("Data", message.author.displayAvatarURL());
                                        message.channel.send(Container);
                                    }
                                });
                            }
                        }
                    } else {
                        emit_print(message);
                    }
                } else {
                    emit_print(message);
                }
            } else if (args[0] == "sub" || args[0] == "-s") {
                if (args[2]) {
                    if (args[1] && args[2].length == 24) {
                        if (isNaN(parseInt(args[1]))) {
                            emit_print(message);
                        } else {
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {
                                methodDB.settab_db("Schede_PG");
                                var cursor = methodDB.serachbyid(args[2]);
                                cursor.then(function (result) {
                                    if (result != null) {
                                        var old_value = result[0].Exp;
                                        var new_value = old_value - parseInt(args[1]);
                                        if (new_value < 0) {
                                            new_value = 0;
                                        }
                                        methodDB.exp_update(result[0]._id, new_value);
                                        LevelUP_auto(message, result[0].Nome_Discord, result[0]._id, new_value);
                                        let member = message.guild.members.cache.get(result[0].Nome_Discord);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(colrs_set)
                                            .setTitle('Scheda: ' + result[0].Nome_PG)
                                            .setThumbnail(member.user.displayAvatarURL(), true)
                                            .addField("Milestone: ", new_value)
                                            .setTimestamp()
                                            .setFooter("Data", message.author.displayAvatarURL());
                                        message.channel.send(Container);
                                    }
                                });
                            }
                        }
                    } else {
                        emit_print(message);
                    }
                } else {
                    emit_print(message);
                }
            } else {
                emit_print(message);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Milestone`)
        .setTitle('Sintassi **' + config.prefix + 'milestone** [Opzione][Valore][ID_Scheda]');
    message.channel.send(Container);
}

function LevelUP_auto(message, id_discord, id, exp) {
    if (exp >= 0 && exp < 3) {
        methodDB.level_update(id, 3);           // 0
        Manager_role_level(message, id_discord, config.Level["Rame"])
    } else if (exp >= 3 && exp < 7) {
        methodDB.level_update(id, 4);           // 4
        Manager_role_level(message, id_discord, config.Level["Rame"])
    } else if (exp >= 7 && exp < 12) {
        methodDB.level_update(id, 5);           // 9
        Manager_role_level(message, id_discord, config.Level["Rame"])
    } else if (exp >= 12 && exp < 18) {
        methodDB.level_update(id, 6);           // 15
        Manager_role_level(message, id_discord, config.Level["Bronzo"])
    } else if (exp >=18 && exp < 25) {
        methodDB.level_update(id, 7);           // 22
        Manager_role_level(message, id_discord, config.Level["Bronzo"])
    } else if (exp >= 25 && exp < 33) {
        methodDB.level_update(id, 8);           // 30
        Manager_role_level(message, id_discord, config.Level["Ferro"])
    } else if (exp >= 33 && exp < 42) {
        methodDB.level_update(id, 9);           // 39
        Manager_role_level(message, id_discord, config.Level["Ferro"])
    } else if (exp >= 42 && exp < 51) {
        methodDB.level_update(id, 10);          // 48
        Manager_role_level(message, id_discord, config.Level["Argento"])
    } else if (exp >= 51 && exp < 61) {
        methodDB.level_update(id, 11);          // 58
        Manager_role_level(message, id_discord, config.Level["Argento"])
    } else if (exp >= 61 && exp < 72) {
        methodDB.level_update(id, 12);          // 69
        Manager_role_level(message, id_discord, config.Level["Electrum"])
    } else if (exp >= 72 && exp < 83) {
        methodDB.level_update(id, 13);          // 81
        Manager_role_level(message, id_discord, config.Level["Electrum"])
    } else if (exp >= 83 && exp < 95) {
        methodDB.level_update(id, 14);          // 93
        Manager_role_level(message, id_discord, config.Level["Oro"])
    } else if (exp >= 95 && exp < 108) {
        methodDB.level_update(id, 15);          // 106
        Manager_role_level(message, id_discord, config.Level["Oro"])
    } else if (exp >= 108 && exp < 122) {
        methodDB.level_update(id, 16);          // 120
        Manager_role_level(message, id_discord, config.Level["Platino"])
    } else if (exp >= 122 && exp < 137) {
        methodDB.level_update(id, 17);          // 135
        Manager_role_level(message, id_discord, config.Level["Platino"])
    } else if (exp >= 137 && exp <153 ) {
        methodDB.level_update(id, 18);          // 151
        Manager_role_level(message, id_discord, config.Level["Mithril"])
    } else if (exp >= 153 && exp < 180) {
        methodDB.level_update(id, 19);          // 168
        Manager_role_level(message, id_discord, config.Level["Mithril"])
    } else if (exp >= 198) {
        methodDB.level_update(id, 20);          // 185
        Manager_role_level(message, id_discord, config.Level["Adamantio"])
    }
}

function Manager_role_level(message, id_discord, level_select) {
    let member = message.guild.members.cache.get(id_discord);
    let Role_select = message.guild.roles.cache.get(level_select)
    if (!member.roles.cache.some(role => role === Role_select)) {
        for (index in config.Level) {
            let Role = message.guild.roles.cache.get(config.Level[index]);
            if (member.roles.cache.some(role => role === Role)) {
                member.roles.remove(Role).catch(console.error);
            }
        }
        member.roles.add(Role_select).catch(console.error);
    }
}