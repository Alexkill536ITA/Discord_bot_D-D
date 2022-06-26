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
        let myRole = message.guild.roles.cache.find(role => role.id === config.role_avance);
        if (message.author.bot) {
            if (message.author.id == config.webhooks || message.author.id == client.user.id) {
                if (args[0] == 'init') {
                    if (args[1].length == 6) {
                        Make_mission_message(client, message, args);
                    }
                } else if (args[0] == 'allert') {
                    if (args[1].length == 6) {
                        Make_mission_allert(client, message, args);
                    }
                } else if (args[0] == 'edit') {
                    if (args[1].length == 6) {
                        Make_mission_message(client, message, args);
                    }
                } else if (args[0] == 'close') {
                    if (args[1].length == 6) {
                        close_mission(client, message, args);
                    }
                }
            }
        } else if (message.member.roles.cache.some(r => config.role_avance.includes(r.id)) || message.author.id == config.owner) {
            if (args[0] == 'init') {
                if (args[1].length == 6) {
                    Make_mission_message(client, message, args);
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando mission`)
                        .setTitle('Sintassi **' + config.prefix + 'mission** init [ID_MISSIONE]');
                    message.channel.send(Container);
                }
            } else if (args[0] == 'edit') {
                if (args[1].length == 6) {
                    Make_mission_message(client, message, args);
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando mission`)
                        .setTitle('Sintassi **' + config.prefix + 'mission** edit [ID_MISSIONE]');
                    message.channel.send(Container);
                }
            } else if (args[0] == 'allert') {
                if (args[1].length == 6) {
                    Make_mission_allert(client, message, args);
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando mission`)
                        .setTitle('Sintassi **' + config.prefix + 'mission** allert [ID_MISSIONE]');
                    message.channel.send(Container);
                }
            } else if (args[0] == 'close') {
                if (args[1].length == 6) {
                    close_mission(client, message, args);
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando mission`)
                        .setTitle('Sintassi **' + config.prefix + 'mission** close [ID_MISSIONE]');
                    message.channel.send(Container);
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
        let role_ping = message.guild.roles.cache.find(role => role.id === config.player_ping);
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

        if (mission['URL_Image'] != "" && mission['URL_Image'] != "Non Aseganata") {
            var immage = mission['URL_Image'];
        } else {
            var immage = "https://cdn.discordapp.com/attachments/759699249947869184/912053846359023666/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";
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
            .setImage(immage)
            .setTimestamp()
            .setFooter("ID: " + mission['ID']);
        // let messageEmbed = await message.channel.send(role_ping, Container).then((msg) => msg.delete({ timeout: exspire_time }));
        if (args[0] == 'init') {
            var messageEmbed = await message.channel.send(role_ping, Container);
            messageEmbed.react(emoji_check);
            methodDB.mission_id_message_update(mission['ID'], messageEmbed.id);
        } else {
            var channel = await client.channels.fetch(config.chat_missioni);
            var message_old = await channel.messages.fetch(mission['Discord_id_message']);
            message_old.edit(Container);
        }

        client.on('messageReactionAdd', async (reaction, user) => {
            try {
                if (config.chat_missioni != reaction.message.channel.id) return;
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == config.chat_missioni) {
                    if (reaction.emoji.name === emoji_check) {
                        // var id_player = await reaction.message.guild.members.cache.get(user.id);
                        var user_web = get_User_web(user.id);
                        if (user_web != 1) {
                            var args_id = reaction.message.embeds[0]['footer']['text'].replace("ID: ", "");
                            if (args[1] == args_id) {
                                var id_mis = args[1];
                            } else {
                                var id_mis = args_id;
                            }

                            mission = await get_Mission(id_mis);

                            // for (let index = 0; index < mission['Player_list'].length; index++) {
                            //     if (mission['Player_list'][index]['ID_Discord'] == user.id) {
                            //         methodDB.settab_db("Registro_missioni");
                            //         methodDB.mission_update_remove(mission['ID'], user.id);
                            //         if (config.register_anonymous_enable == true) {
                            //             reaction.users.remove(user.id);
                            //         }
                            //         return;
                            //     }
                            // }
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
                            if (config.register_anonymous_enable == true) {
                                reaction.users.remove(user.id);
                            }
                        } else {

                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            try {
                if (config.chat_missioni != reaction.message.channel.id) return;
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == config.chat_missioni) {
                    if (reaction.emoji.name === emoji_check) {
                        // var id_player = await reaction.message.guild.members.cache.get(user.id);
                        var user_web = get_User_web(user.id);
                        if (user_web != 1) {
                            var args_id = reaction.message.embeds[0]['footer']['text'].replace("ID: ", "");
                            if (args[1] == args_id) {
                                var id_mis = args[1];
                            } else {
                                var id_mis = args_id;
                            }

                            mission = await get_Mission(id_mis);

                            for (let index = 0; index < mission['Player_list'].length; index++) {
                                if (mission['Player_list'][index]['ID_Discord'] == user.id) {
                                    methodDB.settab_db("Registro_missioni");
                                    methodDB.mission_update_remove(mission['ID'], user.id);
                                    if (config.register_anonymous_enable == true) {
                                        reaction.users.remove(user.id);
                                    }
                                    return;
                                }
                            }
                            // var scheda_player = await get_Scheda_pg(user.id);
                            // var template = {
                            //     "ID_Discord": user.id,
                            //     "Nome_PG": scheda_player['Nome_PG'],
                            //     "Status": "Attesa"
                            // }
                            // if (mission['Player_list'].length == 0) {
                            //     mission['Player_list'][0] = template;
                            // } else {
                            //     mission['Player_list'].push(template);
                            // }
                            // methodDB.settab_db("Registro_missioni");
                            // methodDB.mission_update(mission['ID'], mission);
                            // if (config.register_anonymous_enable == true) {
                            //     reaction.users.remove(user.id);
                            // }
                        } else {

                        }
                    }
                }
            } catch (error) {
                console.log(error);
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
// Make Message Allert Mission
async function Make_mission_allert(client, message, args) {
    try {
        message.delete();
        var mission = await get_Mission(args[1]);
        const avatar_DM = await client.users.fetch(mission['Master_id'])
        var Container = new Discord.MessageEmbed();
        var colrs_set = clor_gen.rand_Color();

        var player = [];
        var reserve = [];

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

        if (player.length == 0) {
            player = ["Null"];
        }

        Container.setColor(colrs_set)
            .setTitle(mission['Nome'])
            .setDescription(mission['Descrizione'])
            .setThumbnail(avatar_DM.displayAvatarURL())
            .addField("🏷 Tag", mission['Tag'], true)
            .addField("👑 Master", "<@" + mission['Master_id'] + ">", true)
            .addField("🎖 Grado", grado, true)
            .addField("🕖 Data e Ora", format_date(mission['Data_ora_missione']))
            .addField("\u200b", "\u200b")
            .addField("👥 Player", player, true)
            .setTimestamp()
            .setFooter("ID:" + mission['ID']);

        if (reserve.length > 0) {
            Container.addField("Reserve", reserve, true);
        }

        methodDB.settab_db("Registro_missioni");
        methodDB.mission_update_status(mission['ID'], 'execute');

        client.channels.cache.get(config.chat_missioni_allert).send(Container);
    } catch (error) {
        console.log(error);
    }
}

/*---------------------------------------------------------------------------------*/
// Close mission
async function close_mission(client, message, args) {
    try {
        message.delete();
        var mission = await get_Mission(args[1]);
        const avatar_DM = await client.users.fetch(mission['Master_id'])
        var Container = new Discord.MessageEmbed();
        var colrs_set = clor_gen.rand_Color();

        var player = [];
        var reserve = [];

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

        if (player.length == 0) {
            player = ["Null"];
        }

        Container.setColor(colrs_set)
            .setTitle('Missione Conclusa: ' + mission['Nome'])
            .setDescription(mission['Descrizione'])
            .setThumbnail(avatar_DM.displayAvatarURL())
            .addField("🏷 Tag", mission['Tag'], true)
            .addField("👑 Master", "<@" + mission['Master_id'] + ">", true)
            .addField("🎖 Grado", grado, true)
            .addField("🕖 Data e Ora", format_date(mission['Data_ora_missione']))
            .addField("\u200b", "\u200b")
            .addField("👥 Player", player, true)
            .setTimestamp()
            .setFooter("ID:" + mission['ID']);

        if (reserve.length > 0) {
            Container.addField("Reserve", reserve, true);
        }

        methodDB.settab_db("Registro_missioni");
        methodDB.mission_update_status(mission['ID'], "disabled");

        client.channels.cache.get(config.chat_missioni_close).send(Container);
    } catch (error) {
        console.log(error);
    }
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
    // console.log(diff);
    // var msec = diff;
    // var gg = Math.floor(msec / 1000 / 60 / 60 / 24);
    // msec -= gg * 1000 * 60 * 60 * 24;
    // var hh = Math.floor(msec / 1000 / 60 / 60);
    // msec -= hh * 1000 * 60 * 60;
    // var mm = Math.floor(msec / 1000 / 60);  
    // msec -= mm * 1000 * 60;
    // var ss = Math.floor(msec / 1000);
    // msec -= ss * 1000;

    // console.log("Giorni:"+gg+" Ora:"+hh+" Minuti:"+mm+" Secondi:"+ss+" Millisecondi:"+msec);

    return diff;
}

function check_limt_32bit(ms) {
    if (ms > 2147483647) {
        return 1;
    } else {
        return ms;
    }
}

function dateCompare(ms) {
    var preimpostata = new Date(ms);
    var oggi = new Date();
    var diff = preimpostata.getTime() - oggi.getTime();
    if (diff <= 0) {
        return 1;
    } else {
        return 0;
    }
};

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
