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
    name: 'fragment',
    description: "Aggiungi o togli Fragment",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute add_sub_fragment');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        try {
            if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
                if (args[0] == "add" || args[0] == "-a") {
                    if (args[2]) {
                        var autore = message.mentions.users.first();
                        try {
                            if (args[1]) {
                                if (isNaN(parseInt(args[1]))) {
                                    emit_print(message);
                                } else {
                                    var Scheda = await get_Scheda_pg(autore.id);
                                    var Scheda_PG = Scheda[0];
                                    if (Scheda_PG == 1) {
                                        Container.setColor([255, 0, 0])
                                            .setAuthor(`Richiesta di: ${autore.username}`)
                                            .setTitle('Errore Scheda PG non trovata');
                                        message.channel.send(Container);
                                        return 1;
                                    }

                                    if (Scheda_PG["Pbc_frag"] == undefined) {
                                        reset_frag(message, Scheda_PG, args[1]);
                                    } else {
                                        var ultima_asseganzione = getmonthNumber(Scheda_PG["Pbc_frag"]["Data"]);
                                        var frammenti_attuale = parseInt(Scheda_PG["Pbc_frag"]["Frammento"]);
                                        var Exp_get_attuale = parseInt(Scheda_PG["Pbc_frag"]["Exp_get"]);
                                        if (config.Level_Chat_reset == true) {
                                            if (ultima_asseganzione == getmonthNumber(new Date())) {
                                                if (Exp_get_attuale < config.Level_milestone_max) {
                                                    add_exp_frag(message, frammenti_attuale, Exp_get_attuale, Scheda_PG, args[1], args[0]);
                                                } else {
                                                    if (Scheda_PG["Avatar"] == "Non Assegnata" || Scheda_PG["Avatar"] == undefined) {
                                                        var avatar = autore.displayAvatarURL();
                                                    } else {
                                                        var avatar = Scheda_PG["Avatar"];
                                                    }
                                                    Container.setColor(colrs_set)
                                                        .setTitle('Scheda: ' + Scheda_PG["Nome_PG"])
                                                        .setThumbnail(avatar, true)
                                                        .setDescription("Ha ragiunto il massimo di Milestone di questo mese")
                                                        .setTimestamp()
                                                        .setFooter("Data", message.author.displayAvatarURL());
                                                    message.channel.send(Container).then((msg) => msg.delete({ timeout: 20000 }));
                                                    return 1;
                                                }
                                            } else {
                                                reset_frag(message, Scheda_PG, args[1]);
                                            }
                                        } else {
                                            add_exp_frag(message, frammenti_attuale, Exp_get_attuale, Scheda_PG, args[1], args[0]);
                                        }

                                    }
                                }
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
                                if (isNaN(parseInt(args[1]))) {
                                    emit_print(message);
                                } else {
                                    var Scheda = await get_Scheda_pg(autore.id);
                                    var Scheda_PG = Scheda[0];
                                    if (Scheda_PG == 1) {
                                        Container.setColor([255, 0, 0])
                                            .setAuthor(`Richiesta di: ${autore.username}`)
                                            .setTitle('Errore Scheda PG non trovata');
                                        message.channel.send(Container);
                                        return 1;
                                    }

                                    if (Scheda_PG["Pbc_frag"] == undefined) {
                                        reset_frag(message, Scheda_PG, 0);
                                    } else {
                                        var ultima_asseganzione = getmonthNumber(Scheda_PG["Pbc_frag"]["Data"]);
                                        var frammenti_attuale = parseInt(Scheda_PG["Pbc_frag"]["Frammento"]);
                                        var Exp_get_attuale = parseInt(Scheda_PG["Pbc_frag"]["Exp_get"]);
                                        if (config.Level_Chat_reset == true) {
                                            if (ultima_asseganzione == getmonthNumber(new Date())) {
                                                if (Exp_get_attuale < config.Level_milestone_max) {
                                                    add_exp_frag(message, frammenti_attuale, Exp_get_attuale, Scheda_PG, args[1], args[0]);
                                                } else {
                                                    return 1;
                                                }
                                            } else {
                                                reset_frag(message, Scheda_PG, 0);
                                            }
                                        } else {
                                            add_exp_frag(message, frammenti_attuale, Exp_get_attuale, Scheda_PG, args[1], args[0]);
                                        }
                                    }
                                }
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
        .setAuthor(`Comando Fragment`)
        // .setTitle('Sintassi **' + config.prefix + 'fragment** [Opzione][Valore][ID_Scheda]');
        .setTitle('Sintassi **' + config.prefix + 'fragment** [Opzione][Valore][@utente]');
    message.channel.send(Container);
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbylistpg(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

function getmonthNumber(d) {
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    return month;
}

function add_exp_frag(message, frammenti, exp, Scheda_PG, value, type) {
    var ogg_temp = {};
    if (type == "add" || type == "-a") {
        frammenti = parseInt(frammenti) + parseInt(value);
    } else if (type == "sub" || type == "-s") {
        frammenti = parseInt(frammenti) - parseInt(value);
    }

    if (frammenti >= config.Level_Chat_max) {
        exp = exp + 1;

        ogg_temp['Exp_get'] = exp;
        ogg_temp['Frammento'] = frammenti - 100;
        ogg_temp['Data'] = new Date();

        var exp_value = Scheda_PG.Exp;
        exp_value = exp_value + 1;
        methodDB.settab_db("Schede_PG");
        methodDB.exp_update(Scheda_PG._id, exp_value);
        var level = LevelUP_auto(message, message.author.id, Scheda_PG._id, exp_value);
        methodDB.inventory_pbc_frag(Scheda_PG._id, ogg_temp);

        var colrs_set = clor_gen.rand_Color();
        let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
        if (Scheda_PG.Avatar == "Non Assegnata" || Scheda_PG.Avatar == undefined) {
            var avatar = member.user.displayAvatarURL();
        } else {
            var avatar = Scheda_PG.Avatar;
        }
        Container = new Discord.MessageEmbed();
        Container.setColor(colrs_set)
            .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
            .setThumbnail(avatar, true)
            .addField("Livello: ", level)
            .addField("Milestone ottenute: ", exp_value)
            .setTimestamp()
            .setFooter("Data", message.author.displayAvatarURL());
        message.channel.send(Container);

    } else {
        var colrs_set = clor_gen.rand_Color();
        ogg_temp['Exp_get'] = exp;
        ogg_temp['Frammento'] = frammenti;
        ogg_temp['Data'] = new Date();
        methodDB.settab_db("Schede_PG");
        methodDB.inventory_pbc_frag(Scheda_PG._id, ogg_temp);
        if (frammenti > 0 && frammenti % config.Level_Chat_allert === 0) {
            Container = new Discord.MessageEmbed();
            Container.setColor(colrs_set)
                .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                .setThumbnail(avatar, true)
                .addField("Frammenti: ", frammenti)
                .addField("\u200B", "Che squillino le trombe signori spettatori! \nInizia la commedia, che parlino gli attori. \nP.S.: hai ottenuto un frammento di milestone!")
                .setTimestamp()
                .setFooter("Data", message.author.displayAvatarURL());
            message.channel.send(Container).then((msg) => msg.delete({ timeout: 20000 }));
        }
    }
}

function reset_frag(message, Scheda_PG, value) {
    var ogg_temp = {};
    if (value > config.Level_Chat_max) {
        value = value - config.Level_Chat_max;
    }
    ogg_temp['Exp_get'] = 0;
    ogg_temp['Frammento'] = value;
    ogg_temp['Data'] = new Date();
    methodDB.settab_db("Schede_PG");
    methodDB.inventory_pbc_frag(Scheda_PG._id, ogg_temp);
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
    } else if (exp >= 18 && exp < 25) {
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
    } else if (exp >= 137 && exp < 153) {
        methodDB.level_update(id, 18);          // 151
        Manager_role_level(message, id_discord, config.Level["Mithril"])
    } else if (exp >= 153 && exp < 172) {
        methodDB.level_update(id, 19);          // 168
        Manager_role_level(message, id_discord, config.Level["Mithril"])
    } else if (exp >= 182) {
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