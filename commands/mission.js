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
            .addField("Tag", mission['Tag'], true)
            .addField("Master", "<@" + mission['Master_id'] + ">", true)
            .addField("\u200b", "\u200b")
            .addField("Grado", grado, true)
            .addField("Player minimi richiesti", mission['Player_min'], true)
            .addField("\u200b", "\u200b")
            .addField("Data e Ora", format_date(mission['Data_ora_missione']), true)
            .addField("Scadenza iscrizione", format_date(mission['Data_scadenza']), true)
            .setTimestamp()
            .setFooter("ID:" + mission['ID']);
        var exspire_time = exspire_date(mission['Data_scadenza']);
        // let messageEmbed = await message.channel.send(role_ping, Container).then((msg) => msg.delete({ timeout: exspire_time }));
        let messageEmbed = await message.channel.send(role_ping, Container);
        messageEmbed.react(emoji_check);
        messageEmbed.delete({ timeout: exspire_time });

        print_call_allert(client, args[1], avatar_DM, exspire_time);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == config.chat_missioni) {
                if (reaction.emoji.name === emoji_check) {
                    // var id_player = await reaction.message.guild.members.cache.get(user.id);
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

async function print_call_allert(client, mission_id, avatar_DM, exspire_time) {
    await sleep(exspire_time);
    var mission = await get_Mission(mission_id);
    var Container = new Discord.MessageEmbed();
    var colrs_set = clor_gen.rand_Color();

    var player = [];
    var reserve = [];

    for (let index = 0; index < mission['Player_list'].length; index++) {
        if (mission['Player_list'][index]['Status'] == 'Accettato') {
            player.push("<@" + mission['Player_list'][index]['ID_Discord'] + ">")
        } else if (mission['Player_list'][index]['Status'] == 'Riserva') {
            reserve.push("<@" + mission['Player_list'][index]['ID_Discord'] + ">")
        }
    }

    Container.setColor(colrs_set)
        .setTitle(mission['Nome'])
        .setDescription(mission['Descrizione'])
        .setThumbnail(avatar_DM.displayAvatarURL())
        .addField("Tag", mission['Tag'], true)
        .addField("Master", "<@" + mission['Master_id'] + ">", true)
        .addField("Data e Ora", format_date(mission['Data_ora_missione']))
        .addField("Player", player, true)
        .setTimestamp()
        .setFooter("ID:" + mission['ID']);

    if (reserve != []) {
        Container.addField("Reserve", reserve, true);
    }

    client.channels.cache.get(config.chat_missioni_ping).send(Container);
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
    return diff;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}