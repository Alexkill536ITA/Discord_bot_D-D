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
    name: 'milestone',
    description: "Aggiungi o togli Milestone",
    async execute(message, args){
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if(message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
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
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var js_result = JSON.stringify(result);
                                        js_result = JSON.parse(js_result);
                                        var old_value = parseInt(js_result['Exp']);
                                        var new_value = old_value + parseInt(args[1]);
                                        if (new_value < 0) {
                                            new_value = 0;
                                        }
                                        methodDB.exp_update(js_result['_id'], new_value);
                                        LevelUP_auto(js_result['_id'],new_value);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor([255, 0, 0])
                                            .setTitle('Schada: '+ message.author.username)
                                            .setThumbnail(message.author.displayAvatarURL(),true)
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
                                cursor.then(function(result) {
                                    if (result != null) {
                                        var js_result = JSON.stringify(result);
                                        js_result = JSON.parse(js_result);
                                        var old_value = parseInt(js_result['Exp']);
                                        var new_value = old_value - parseInt(args[1]);
                                        if (new_value < 0) {
                                            new_value = 0;
                                        }
                                        methodDB.exp_update(js_result['_id'], new_value);
                                        LevelUP_auto(js_result['_id'],new_value);
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor([255, 0, 0])
                                            .setTitle('Schada: '+ message.author.username)
                                            .setThumbnail(message.author.displayAvatarURL(),true)
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
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Milestone`)
        .setTitle('Sintassi **&milestone** [Opzione][Valore][ID_Scheda]');        
    message.channel.send(Container);
}

function LevelUP_auto(id,exp) {
    if (exp < 4) {
        methodDB.level_update(id, 3);
    } else if (exp >= 4 && exp < 9) {
        methodDB.level_update(id, 4);
    } else if (exp >= 9 && exp < 15) {
        methodDB.level_update(id, 5);
    } else if (exp >= 15 && exp < 23) {
        methodDB.level_update(id, 6);
    } else if (exp >= 23 && exp < 32) {
        methodDB.level_update(id, 7);
    } else if (exp >= 32 && exp < 42) {
        methodDB.level_update(id, 8);
    } else if (exp >= 42 && exp < 53) {
        methodDB.level_update(id, 9);
    } else if (exp >= 53 && exp < 65) {
        methodDB.level_update(id, 10);
    } else if (exp >= 65 && exp < 78) {
        methodDB.level_update(id, 11);
    } else if (exp >= 78 && exp < 92) {
        methodDB.level_update(id, 12);
    } else if (exp >= 92 && exp < 107) {
        methodDB.level_update(id, 13);
    } else if (exp >= 107 && exp < 123) {
        methodDB.level_update(id, 14);
    } else if (exp >= 123 && exp < 140) {
        methodDB.level_update(id, 15);
    } else if (exp >= 140 && exp < 158) {
        methodDB.level_update(id, 16);
    } else if (exp >= 158 && exp < 177) {
        methodDB.level_update(id, 17);
    } else if (exp >= 177 && exp < 197) {
        methodDB.level_update(id, 18);
    } else if (exp >= 197 && exp < 218) {
        methodDB.level_update(id, 19);
    } else if (exp >= 218) {
        methodDB.level_update(id, 20);
    } 
}