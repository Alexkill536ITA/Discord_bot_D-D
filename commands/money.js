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
    name: 'money',
    description: "Aggiungi o togli denaro",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ '+color.cyan('DEBUG')+' ] Event Execute add_sub_money');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if(message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0] == "add" || args[0] == "-a") {
                if (args[2]) {
                    if (args[1] && args[2].length == 24) {
                        if (isNaN(parseFloat(args[1]))) {
                            emit_print(message);
                        } else {
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {
                                methodDB.settab_db("Schede_PG");
                                var cursor = methodDB.serachbyid(args[2]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var old_value = result[0].Money;
                                        var new_value = old_value + parseFloat(args[1]);
                                        methodDB.money_update(result[0]._id, new_value);
                                        let member = message.guild.members.cache.get(result[0].Nome_Discord);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(colrs_set)
                                            .setTitle('Schada: '+ result[0].Nome_PG)
                                            .setThumbnail(member.user.displayAvatarURL(),true)
                                            .addField("Money", new_value)
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
                        if (isNaN(parseFloat(args[1]))) {
                            emit_print(message);
                        } else {
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {
                                methodDB.settab_db("Schede_PG");
                                var cursor = methodDB.serachbyid(args[2]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var old_value = result[0].Money;
                                        var new_value = old_value - parseFloat(args[1]);
                                        if (new_value < 0) {
                                            new_value = 0;
                                        }
                                        methodDB.money_update(result[0]._id, new_value);
                                        let member = message.guild.members.cache.get(result[0].Nome_Discord);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(colrs_set)
                                            .setTitle('Schada: '+ result[0].Nome_PG)
                                            .setThumbnail(member.user.displayAvatarURL(),true)
                                            .addField("Money", new_value)
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
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Money`)
        .setTitle('Sinstassi **'+config.prefix+'money** [Opzione][Valore][ID_Scheda]');
    message.channel.send(Container);
}