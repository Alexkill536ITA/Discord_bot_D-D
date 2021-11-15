/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const { MongoClient, Cursor } = require("mongodb");
const Discord = require('discord.js');
const methodDB = require("../mongodb_controll");
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'mission',
    description: "Gestore missioni",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute mission');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if (message.author.bot && message.author.id == config.webhooks) {
            if (args[0] == 'init') {
                if (args[1].length == 6) {
                    Make_mission_message(client, message, args);
                }
            } else if (args[0] == 'response') {
                if (args[1].length == 6) {
                    Make_mission_response(client, message, args);
                }
            } else if (args[0] == 'edit') {
                if (args[1].length == 6) {
                    Make_mission_message(client, message, args);
                }
            }
        } else if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            if (args[0] == 'init') {
                if (args[1].length == 6) {
                    Make_mission_message(client, message, args);
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando mission`)
                        .setTitle('Sintassi **' + config.prefix + 'mission** [Opzione][ID_MISSIONE]');
                    message.channel.send(Container);
                }
                // } else if (args[0] == 'close') {
                //     if (args[1].length == 6) {
                //         if (args[2] && args[3]) {
                //             close_mission(client, message, args);
                //         } else {
                //             Container.setColor([255, 0, 0])
                //                 .setAuthor(`Comando mission`)
                //                 .setTitle('Sintassi **' + config.prefix + 'mission close** [ID_MISSIONE]');
                //             message.channel.send(Container);
                //         }
                //     } else {

                //     }
            } else if (args[0] == 'unlock') {
                if (args[1]) {
                    var autore = message.mentions.users.first();
                    var on_sevice_db = await methodDB.open_db();
                    if (on_sevice_db != 1) {
                        methodDB.settab_db("Utenti_web");
                        var cursor = methodDB.serachbyid_user(autore.id);
                        cursor.then(function (result) {
                            if (result != null) {
                                methodDB.block_reset(result._id);
                                let member = message.guild.members.cache.get(result.Nome_Discord);
                                if (result.Avatar == "Non Assegnata" || result.Avatar == undefined) {
                                    var avatar = member.user.displayAvatarURL();
                                } else {
                                    var avatar = result.Avatar;
                                }
                                Container = new Discord.MessageEmbed();
                                Container.setColor(colrs_set)
                                    .setDescription("Utente Sbloccato")
                                    .setTitle('Utente: ' + autore.name)
                                    .setThumbnail(avatar, true)
                                    .setTimestamp()
                                    .setFooter("Data", message.author.displayAvatarURL());
                                message.channel.send(Container);
                            }
                        });
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando mission`)
                            .setTitle('Sintassi **' + config.prefix + 'mission unlock** [@utente]');
                        message.channel.send(Container);
                    }
                }
            } else if (args[0] == 'lock') {
                if (args[1]) {
                    var autore = message.mentions.users.first();
                    var on_sevice_db = await methodDB.open_db();
                    if (on_sevice_db != 1) {
                        methodDB.settab_db("Utenti_web");
                        var cursor = methodDB.serachbyid_user(autore.id);
                        cursor.then(function (result) {
                            if (result != null) {
                                methodDB.block_control(result._id, 1);
                                let member = message.guild.members.cache.get(result.Nome_Discord);
                                if (result.Avatar == "Non Assegnata" || result.Avatar == undefined) {
                                    var avatar = member.user.displayAvatarURL();
                                } else {
                                    var avatar = result.Avatar;
                                }
                                Container = new Discord.MessageEmbed();
                                Container.setColor(colrs_set)
                                    .setDescription("Utente bloccato")
                                    .setTitle('Utente: ' + autore.name)
                                    .setThumbnail(avatar, true)
                                    .setTimestamp()
                                    .setFooter("Data", message.author.displayAvatarURL());
                                message.channel.send(Container);
                            }
                        });
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando mission`)
                            .setTitle('Sintassi **' + config.prefix + 'mission lock** [@utente]');
                        message.channel.send(Container);
                    }
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`Comando mission`)
                    .setTitle('Sintassi **' + config.prefix + 'mission** [Opzione][ID_MISSIONE]');
                message.channel.send(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
}

/*---------------------------------------------------------------------------------*/
// Make Missione attacment Reaction Role Registration
async function Make_mission_message(client, message, args) {
    var Container = new Discord.MessageEmbed();
    var colrs_set = clor_gen.rand_Color();
    var mission = await get_Mission(args[1]);
    if (mission != null && mission != 1) {
        let role_ping = message.guild.roles.cache.find(role => role.name === config.player_ping);
        const avatar_DM = await client.users.fetch(mission['Master_id'])
        const emoji_check = '✅';

        var grado = [];
        for (let index = 0; index < mission['Grado'].length; index++) {
            if (mission['Grado'][index] == "Rame") {
                grado.push("<@&" + config.Level.Rame + ">")
            }
            if (mission['Grado'][index] == "Bronzo") {
                grado.push("<@&" + config.Level.Bronzo + ">")
            }
            if (mission['Grado'][index] == "Ferro") {
                grado.push("<@&" + config.Level.Ferro + ">")
            }
            if (mission['Grado'][index] == "Argento") {
                grado.push("<@&" + config.Level.Argento + ">")
            }
            if (mission['Grado'][index] == "Electrum") {
                grado.push("<@&" + config.Level.Electrum + ">")
            }
            if (mission['Grado'][index] == "Oro") {
                grado.push("<@&" + config.Level.Oro + ">")
            }
            if (mission['Grado'][index] == "Platino") {
                grado.push("<@&" + config.Level.Platino + ">")
            }
            if (mission['Grado'][index] == "Mithril") {
                grado.push("<@&" + config.Level.Mithril + ">")
            }
            if (mission['Grado'][index] == "Adamantio") {
                grado.push("<@&" + config.Level.Adamantio + ">")
            }
        }

        Container.setColor(colrs_set)
            .setTitle(mission['Nome'])
            .setDescription(mission['Descrizione'])
            .setThumbnail(avatar_DM.displayAvatarURL())
            .addField("\u200b", "\u200b")
            .addField("🏷 Tag", mission['Tag'], true)
            .addField("👑 Master", "<@" + mission['Master_id'] + ">", true)
            .addField("\u200b", "\u200b")
            .addField("🎖 Grado", grado, true)
            .addField("👥 Player minimi richiesti", mission['Player_min'], true)
            .addField("\u200b", "\u200b")
            .addField("🕖 Data e Ora", format_date(mission['Data_ora_missione']), true)
            .addField("📝 Scadenza iscrizione", format_date(mission['Data_scadenza']), true)
            .setTimestamp()
            .setFooter("ID:" + mission['ID']);
        var exspire_time = exspire_date(mission['Data_scadenza']);
        // let messageEmbed = await message.channel.send(role_ping, Container).then((msg) => msg.delete({ timeout: exspire_time }));
        if (args[0] == 'init') {
            var messageEmbed = await message.channel.send(role_ping, Container);
            messageEmbed.react(emoji_check);
            // messageEmbed.delete({ timeout: exspire_time });
            methodDB.mission_id_message_update(mission['ID'], messageEmbed.id);
        } else {
            var channel = await client.channels.fetch(config.chat_missioni);
            var message_old = await channel.messages.fetch(mission['Discord_id_message']);
            message_old.edit(Container);
            // message_old.delete({ timeout: exspire_time });
        }

        print_call_allert(client, args[1], avatar_DM, exspire_date(mission['Data_ora_missione']));

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == config.chat_missioni) {
                if (reaction.emoji.name === emoji_check) {
                    // var id_player = await reaction.message.guild.members.cache.get(user.id);
                    var user_web = get_User_web(user.id);
                    if (user_web != 1) {
                        mission = await get_Mission(args[1]);

                        for (let index = 0; index < mission['Player_list'].length; index++) {
                            if (mission['Player_list'][index]['ID_Discord'] == user.id) {
                                methodDB.settab_db("Registro_missioni");
                                methodDB.mission_update_remove(mission['ID'], user.id);
                                reaction.users.remove(user.id);
                                return;
                            }
                        }
                        var scheda_player = await get_Scheda_pg(user.id);
                        var template = {
                            "ID_Discord": user.id,
                            "Nome_PG": scheda_player['Nome_PG'],
                            "Status": "Attesa"
                        }
                        if (mission['Player_list'].length == 0) {
                            mission['Player_list'][0] = template;
                        } else {
                            mission['Player_list'].push(template);
                        }
                        methodDB.settab_db("Registro_missioni");
                        methodDB.mission_update(mission['ID'], mission);
                        reaction.users.remove(user.id);
                    } else {

                    }
                }
            }
        });
        message.delete();
    } else {
        Container.setColor([255, 0, 0])
            .setAuthor(`Richiesta di: ${message.author.username}`)
            .setTitle('Errore Missione non trovata');
        message.channel.send(Container);
    }
}

/*---------------------------------------------------------------------------------*/
// Make Message Remainder Mission
async function print_call_allert(client, mission_id, avatar_DM, exspire_time) {
    await sleep(exspire_time);
    var mission = await get_Mission(mission_id);
    var Container = new Discord.MessageEmbed();
    var colrs_set = clor_gen.rand_Color();

    var player = [];
    var reserve = [];

    if (mission['Player_list'] == null) {
        return 1;
    }

    for (let index = 0; index < mission['Player_list'].length; index++) {
        if (mission['Player_list'][index]['Status'] == 'Accettato') {
            player.push("<@" + mission['Player_list'][index]['ID_Discord'] + ">");
            increment_pryority(mission['Player_list'][index]['ID_Discord']);
            block_control(mission['Player_list'][index]['ID_Discord'], 1);
        } else if (mission['Player_list'][index]['Status'] == 'Riserva') {
            reserve.push("<@" + mission['Player_list'][index]['ID_Discord'] + ">");
        }
    }

    Container.setColor(colrs_set)
        .setTitle(mission['Nome'])
        .setDescription(mission['Descrizione'])
        .setThumbnail(avatar_DM.displayAvatarURL())
        .addField("🏷 Tag", mission['Tag'], true)
        .addField("👑 Master", "<@" + mission['Master_id'] + ">", true)
        .addField("🕖 Data e Ora", format_date(mission['Data_ora_missione']))
        .addField("👥 Player", player, true)
        .setTimestamp()
        .setFooter("ID:" + mission['ID']);

    if (reserve != []) {
        Container.addField("Reserve", reserve, true);
    }

    methodDB.settab_db("Registro_missioni");
    methodDB.mission_update_status(mission['ID'], 'execute');

    client.channels.cache.get(config.chat_missioni_ping).send(Container);
}

/*---------------------------------------------------------------------------------*/
// Make Message Response Mission
async function Make_mission_response(client, message, args) {
    message.delete();
    var mission = await get_Mission(args[1]);
    const avatar_DM = await client.users.fetch(mission['Master_id'])
    var Container = new Discord.MessageEmbed();
    var colrs_set = clor_gen.rand_Color();

    var player = [];
    var reserve = [];

    if (mission['Player_list'] == null) {
        return 1;
    }

    for (let index = 0; index < mission['Player_list'].length; index++) {
        if (mission['Player_list'][index]['Status'] == 'Accettato') {
            player.push("<@" + mission['Player_list'][index]['ID_Discord'] + ">");
        } else if (mission['Player_list'][index]['Status'] == 'Riserva') {
            reserve.push("<@" + mission['Player_list'][index]['ID_Discord'] + ">");
        }
    }

    var grado = [];
    for (let index = 0; index < mission['Grado'].length; index++) {
        if (mission['Grado'][index] == "Rame") {
            grado.push("<@&" + config.Level.Rame + ">")
        }
        if (mission['Grado'][index] == "Bronzo") {
            grado.push("<@&" + config.Level.Bronzo + ">")
        }
        if (mission['Grado'][index] == "Ferro") {
            grado.push("<@&" + config.Level.Ferro + ">")
        }
        if (mission['Grado'][index] == "Argento") {
            grado.push("<@&" + config.Level.Argento + ">")
        }
        if (mission['Grado'][index] == "Electrum") {
            grado.push("<@&" + config.Level.Electrum + ">")
        }
        if (mission['Grado'][index] == "Oro") {
            grado.push("<@&" + config.Level.Oro + ">")
        }
        if (mission['Grado'][index] == "Platino") {
            grado.push("<@&" + config.Level.Platino + ">")
        }
        if (mission['Grado'][index] == "Mithril") {
            grado.push("<@&" + config.Level.Mithril + ">")
        }
        if (mission['Grado'][index] == "Adamantio") {
            grado.push("<@&" + config.Level.Adamantio + ">")
        }
    }

    Container.setColor(colrs_set)
        .setTitle("Esito della Missione " + mission['Nome'])
        .setDescription(mission['Esito_missione'])
        .setThumbnail(avatar_DM.displayAvatarURL())
        .addField("🏷 Tag", mission['Tag'], true)
        .addField("👑 Master", "<@" + mission['Master_id'] + ">", true)
        .addField("🎖 Grado", grado, true)
        .addField("\u200b", "\u200b")
        .addField("👥 Player", player, true)
        .setTimestamp()
        .setFooter("ID:" + mission['ID']);

    if (reserve != []) {
        Container.addField("Reserve", reserve, true);
    }

    client.channels.cache.get(config.chat_missioni_esito).send(Container);
}

/*---------------------------------------------------------------------------------*/
// Close mission and Unlcok player
async function close_mission(client, message, args) {
    var mission = await get_Mission(args[1]);
    for (let index = 0; index < mission['Player_list'].length; index++) {
        if (mission['Player_list'][index]['Status'] == 'Accettato') {
            block_control(mission['Player_list'][index]['ID_Discord'], 0);
            var cursor = methodDB.load_pg(mission['Player_list'][index]['ID_Discord']);
            cursor.then(function (result) {
                if (result != null) {
                    var old_value = result.Exp;
                    var new_value = old_value + parseInt(args[2]);
                    methodDB.exp_update(result._id, new_value);
                    LevelUP_auto(message, result.Nome_Discord, result._id, new_value);
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
                        .addField("Milestone: ", new_value)
                        .setTimestamp()
                        .setFooter("Data", message.author.displayAvatarURL());
                    message.channel.send(Container);
                }
            });
            var cursor = methodDB.load_pg(autore.id);
            cursor.then(function (result) {
                if (result != null) {
                    var old_value = parseFloat(result.Money);
                    var new_value = old_value + parseFloat(args[1]);
                    methodDB.money_update(result._id, new_value);
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
                        .addField("💰 Money", new_value)
                        .setTimestamp()
                        .setFooter("Data", message.author.displayAvatarURL());
                    message.channel.send(Container);
                }
            });
        }
    }
    methodDB.mission_update_status(args[1], "disabled")
}

/*---------------------------------------------------------------------------------*/
// Section function

// Database Controll
async function get_Mission(id_mission) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Registro_missioni");
        var cursor = methodDB.load_mission(id_mission);
    } else {
        return 1;
    }
    return cursor;
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        // var cursor = methodDB.serachbyid(id_serach);
        var cursor = methodDB.load_pg(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

async function get_User_web(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbyid_user(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

async function increment_pryority(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Utenti_web");
        methodDB.pryority_control(id_serach, 1);
    } else {
        return 1;
    }
}

async function block_control(id_serach, value) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Utenti_web");
        methodDB.block_control(id_serach, value);
    } else {
        return 1;
    }
}

// Date Formatter and calculator
function format_date(date_int) {
    var today = new Date(date_int);
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    var ora = today.getHours();
    var minuti = today.getMinutes();
    month = String(parseInt(month) + 1);
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (ora < 10) {
        ora = "0" + ora;
    }
    if (minuti < 10) {
        minuti = "0" + minuti;
    }
    return day + "/" + month + "/" + year + " " + ora + ":" + minuti
}

function exspire_date(date_int) {
    var ext_date = new Date(date_int);
    var today = new Date();
    if (ext_date < today) {
        ext_date.setDate(ext_date.getDate() + 1);
    }
    var diff = ext_date - today;
    if (diff < 0) {
        diff = today.setDate(today.getDate() + 7);
    }
    diff = parseInt(diff / 1000)
    // var msec = diff;
    // var hh = Math.floor(msec / 1000 / 60 / 60);
    // msec -= hh * 1000 * 60 * 60;
    // var mm = Math.floor(msec / 1000 / 60);  
    // msec -= mm * 1000 * 60;
    // var ss = Math.floor(msec / 1000);
    // msec -= ss * 1000;

    // console.log("Ora:"+hh+" Minuti:"+mm+" Secondi:"+ss+" Millisecondi:"+msec);
    // console.log(typeof diff);
    // console.log(diff);

    return diff;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Level EXP Dependencies 
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