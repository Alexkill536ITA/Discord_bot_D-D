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

module.exports = {
    name: 'money',
    description: "Aggiungi o togli denaro",
    async execute(message, args) {
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if(message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            if (args[0] == "add" || args[0] == "-a") {
                if (args[2]) {
                    if (args[1] && args[2].length == 24) {
                        if (isNaN(parseFloat(args[1]))) {
                            emit_print(message);
                        } else {
                            var on_sevice_db = await methodDB.open_db();
                            if (on_sevice_db != 1) {
                                var cursor = methodDB.serachbyid(args[2]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var js_result = JSON.stringify(result);
                                        js_result = JSON.parse(js_result);
                                        var old_value = parseFloat(js_result['Money']);
                                        var new_value = old_value + parseFloat(args[1]);
                                        methodDB.money_update(js_result['_id'], new_value);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor([255, 0, 0])
                                            .setTitle('Schada: '+ message.author.username)
                                            .setThumbnail(message.author.displayAvatarURL(),true)
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
                                var cursor = methodDB.serachbyid(args[2]);
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var js_result = JSON.stringify(result);
                                        js_result = JSON.parse(js_result);
                                        var old_value = parseFloat(js_result['Money']);
                                        var new_value = old_value - parseFloat(args[1]);
                                        methodDB.money_update(js_result['_id'], new_value);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor([255, 0, 0])
                                            .setTitle('Schada: '+ message.author.username)
                                            .setThumbnail(message.author.displayAvatarURL(),true)
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
                .setTitle('Non sei autoriazato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Money`)
        .setTitle('Sinstassi **&money** [Opzione][Valore][ID_Scheda]');
    message.channel.send(Container);
}