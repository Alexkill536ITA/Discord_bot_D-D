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

exports.mission_recovey = async function (client) {
    try {
        var cursor_ar = await get_Mission_all();
        var fail = 0;
        cursor_ar.forEach(async (element) => {
            try {
                Make_mission_message(client, element['ID'])
            } catch (error) {
                console.log("[ " + color.red('ERROR') + " ] Recovery Mission Faill");
                if (config.Debug_Level == 'DEBUG') {
                    console.log("\n[ " + color.magenta('DEBUG') + " ] " + error);
                }
                fail = 1;
                return;
            }
        });
        if (fail != 1) {
            console.info('[  ' + color.green('OK') + '   ] Recovery Mission success');
        }
    } catch (error) {
        console.log("[ " + color.red('ERROR') + " ] Recovery Mission Faill");
        if (config.Debug_Level == 'DEBUG') {
            console.log("\n[ " + color.magenta('DEBUG') + " ] " + error);
        }
    }

}

async function get_Mission_all() {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Registro_missioni");
        var cursor = await methodDB.recoverymission();
    } else {
        return 1;
    }
    return cursor;
}

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Make_mission_message(client, args) {
    var Container = new Discord.MessageEmbed();
    var colrs_set = clor_gen.rand_Color();
    var mission = await get_Mission(args);
    if (mission != null && mission != 1) {
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
        var channel = await client.channels.fetch(config.chat_missioni);
        var message = await channel.messages.fetch(mission['Discord_id_message']);
        message.edit(Container);
        message.delete({ timeout: exspire_time });


        print_call_allert(client, args, avatar_DM, exspire_date(mission['Data_ora_missione']));

        client.on('messageReactionAdd', async (reaction, user) => {
            try {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == config.chat_missioni) {
                    if (reaction.emoji.name === emoji_check) {
                        // var id_player = await reaction.message.guild.members.cache.get(user.id);
                        var user_web = get_User_web(user.id);
                        if (user_web != 1) {
                            mission = await get_Mission(args);

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
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == config.chat_missioni) {
                    if (reaction.emoji.name === emoji_check) {
                        // var id_player = await reaction.message.guild.members.cache.get(user.id);
                        var user_web = get_User_web(user.id);
                        if (user_web != 1) {
                            mission = await get_Mission(args);

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
    } else {
        Container.setColor([255, 0, 0])
            .setAuthor(`Richiesta di: ${config.Nickname_Bot}`)
            .setTitle('Errore Missione non trovata');
        client.channels.cache.get(config.chat_missioni).send(Container);
    }
}

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

    if (player.length == 0) {
        methodDB.settab_db("Registro_missioni");
        methodDB.mission_update_status(mission['ID'], 'disable');
        return;
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