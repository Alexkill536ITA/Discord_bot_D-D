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
    name: 'fama',
    description: "Aggiungi o togli fama",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute add_sub_fama');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.id === config.role_avance);
        try {
            if (message.member.roles.cache.some(r => config.role_avance.includes(r.id)) || message.author.id == config.owner) {
                var colrs_set = clor_gen.rand_Color();
                if (args[0] == "add" || args[0] == "-a") {
                    if (args[2]) {
                        var autore = message.mentions.users.first();
                        try {
                            if (args[1]) {
                                if (isNaN(parseInt(args[1]))) {
                                    emit_print(message);
                                } else {
                                    var on_sevice_db = await methodDB.open_db();
                                    if (on_sevice_db != 1) {
                                        methodDB.settab_db("Schede_PG");
                                        var cursor = methodDB.load_pg(autore.id);
                                        cursor.then(function (result) {
                                            if (result != null) {
                                                var old_value = parseInt(result.Punti_Fama);
                                                var new_value = old_value + parseInt(args[1]);
                                                methodDB.fama_update(result._id, new_value);
                                                let member = message.guild.members.cache.get(result.Nome_Discord);
                                                if (result.Avatar == "Non Assegnata" || result.Avatar == undefined) {
                                                    var avatar = member.user.displayAvatarURL();
                                                } else {
                                                    var avatar = result.Avatar;
                                                }
                                                Container = new Discord.MessageEmbed();
                                                Container.setColor(colrs_set)
                                                    .setTitle('Scheda: ' + result.Nome_PG)
                                                    .setThumbnail(avatar, true)
                                                    .addField("Grado", getgrado(result.Casata, new_value))
                                                    .addField("Fama", new_value)
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
                        } catch {
                            emit_print(message);
                        }
                    } else {
                        emit_print(message);
                    }
                } else if (args[0] == "sub" || args[0] == "-s") {
                    if (args[2]) {
                        var autore = message.mentions.users.first();
                        try {
                            if (args[1]) {
                                if (isNaN(parseFloat(args[1]))) {
                                    emit_print(message);
                                } else {
                                    var on_sevice_db = await methodDB.open_db();
                                    if (on_sevice_db != 1) {
                                        methodDB.settab_db("Schede_PG");
                                        var cursor = methodDB.load_pg(autore.id);
                                        cursor.then(function (result) {
                                            if (result != null) {
                                                var old_value = result.Punti_Fama;
                                                var new_value = old_value - parseInt(args[1]);
                                                if (new_value < 0) {
                                                    new_value = 0;
                                                }
                                                methodDB.fama_update(result._id, new_value);
                                                let member = message.guild.members.cache.get(result.Nome_Discord);
                                                if (result.Avatar == "Non Assegnata" || result.Avatar == undefined) {
                                                    var avatar = member.user.displayAvatarURL();
                                                } else {
                                                    var avatar = result.Avatar;
                                                }
                                                Container = new Discord.MessageEmbed();
                                                Container.setColor(colrs_set)
                                                    .setTitle('Scheda: ' + result.Nome_PG)
                                                    .setThumbnail(avatar, true)
                                                    .addField("Grado", getgrado(result.Casata, new_value))
                                                    .addField("Fama", new_value)
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
                        } catch {
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

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Fama`)
        // .setTitle('Sinstassi **' + config.prefix + 'fama** [Opzione][Valore][ID_Scheda]');
        .setTitle('Sinstassi **' + config.prefix + 'fama** [Opzione][Valore][@utente]');
    message.channel.send(Container);
}

function getgrado(casata, punti) {
    casata = casata.toLowerCase();
    var gradi = config.list_gradi[casata];
    for (const key in gradi) {
        if (punti >= gradi[key]['value_min'] && punti <= gradi[key]['value_max']) {
            return gradi[key]['name'];
        }
    }
}