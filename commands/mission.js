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
        var colrs_set = clor_gen.rand_Color();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if (message.author.bot && message.author.id == config.webhooks) {
            if (args[0] == 'init') {
                if (args[1].length == 6) {
                    var mission = await get_Mission(args[1]);
                    if (mission != null && mission != 1) {

                        let role_ping = message.guild.roles.cache.find(role => role.name === config.chat_scambi_ping);
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
                        // var exspire_time = exspire_date(mission['Data_scadenza']);
                        // let messageEmbed = await message.channel.send(role_ping, Container).then(msg=>msg.delete({ timeout: exspire_time }));
                        let messageEmbed = await message.channel.send(role_ping, Container);

                        client.on('messageReactionAdd', async (reaction, user) => {
                            if (reaction.message.partial) await reaction.message.fetch();
                            if (reaction.partial) await reaction.fetch();
                            if (user.bot) return;
                            if (!reaction.message.guild) return;

                            if (reaction.message.channel.id == config.chat_missioni) {
                                if (reaction.emoji.name === emoji_check) {
                                    var id_player = await reaction.message.guild.members.cache.get(user.id);
                                    var scheda_player = await get_Scheda_pg(id_player);
                                    var template = {
                                        "ID_Discord": id_player,
                                        "Nome_PG": scheda_player['Nome_PG'],
                                        "Status": "Attesa"
                                    }
                                    mission['Player_list'].push(template);
                                    await methodDB.mission_update(mission['ID'], mission);
                                }
                            }
                        });

                        client.on('messageReactionRemove', async (reaction, user) => {
                            if (reaction.message.partial) await reaction.message.fetch();
                            if (reaction.partial) await reaction.fetch();
                            if (user.bot) return;
                            if (!reaction.message.guild) return;

                            if (reaction.message.channel.id == config.chat_missioni) {
                                if (reaction.emoji.name === emoji_check) {
                                    var id_player = await reaction.message.guild.member.cache.get(user.id);
                                    var Player_list = mission['Player_list']; 
                                    for (let index = 0; index < mission['Player_list'].length; index++) {
                                        if (Player_list[index]['ID_Discord'] == id_player) {
                                            methodDB.mission_update_remove(mission['ID'], index);
                                            break;
                                        }              
                                    }
                                }
                            } else {
                                return;
                            }
                        });
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Richiesta di: ${message.author.username}`)
                            .setTitle('Errore Missione non trovata');
                        message.channel.send(Container);
                    }
                }
            }
        } else if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {

        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
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
    var day = today.getDay();
    var ora = today.getHours();
    var minuti = today.getMinutes();
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
    diff = parseInt(diff/1000)
    return diff;
}