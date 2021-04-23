/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const { MongoClient } = require("mongodb");
const Discord = require('discord.js');
const methodDB = require("../mongodb_controll.js");
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");


module.exports = {
    name: 'pgavatar',
    description: "mostra o modifica pgavatar",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute avatar_pg');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0] == "show" || args[0] == "-v") {
                if (args[1] && args[1].length == 24) {
                    const cursor = await get_Scheda_pg(args[1]);
                    cursor.then(function (result) {
                        if (result != null) {
                            var js_result = JSON.stringify(result);
                            js_result = JSON.parse(js_result);
                            let member = message.guild.members.cache.get(js_result['Nome_Discord']);
                            if (js_result['Avatar_pg'] == "Non Assegnata" || js_result['Avatar_pg'] == undefined) {
                                var avatar = member.user.displayAvatarURL();
                            } else {
                                var avatar = js_result['Avatar_pg'];
                            }
                            Container = new Discord.MessageEmbed();
                            Container.setColor(colrs_set)
                                .setTitle('Avatar PG di: ' + js_result['Nome_PG'])
                                .setTimestamp()
                                .setFooter("Data", message.author.displayAvatarURL())
                                .setImage(avatar);
                            message.channel.send(Container);
                        } else {
                            Container.setColor([255, 0, 0])
                                .setAuthor(`Richiesta di: ${message.author.username}`)
                                .setTitle('Errore Scheda non trovata');
                            message.channel.send(Container);
                        }
                    });
                } else {
                    emit_print(message);
                }
            } else if (args[0] == "set" || args[0] == "-s") {
                if (args[1]) {
                    var cursor = await get_Scheda_pg(args[1]);
                    cursor.then(function (result) {
                        if (result != null) {
                            var js_result = JSON.stringify(result);
                            js_result = JSON.parse(js_result);
                            if (message.author.id != js_result['Nome_Discord']) {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Utente non valido: ` + message.author.username)
                                    .setTitle('Non puoi spacciarti per un altro');
                                message.channel.send(Container);
                                return 1
                            }
                            if (validURL(args[1])) {
                                Container = new Discord.MessageEmbed();
                                Container.setColor(colrs_set)
                                    .setTitle('Avatar PG di: ' + js_result['Nome_PG'])
                                    .setTimestamp()
                                    .setFooter("Data", message.author.displayAvatarURL())
                                    .setImage(avatar);
                                message.channel.send(Container);
                            } else {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore URL Non Valido');
                                message.channel.send(Container);
                            }
                        } else {
                            Container.setColor([255, 0, 0])
                                .setAuthor(`Richiesta di: ${message.author.username}`)
                                .setTitle('Errore Scheda non trovata');
                            message.channel.send(Container);
                        }
                    });
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
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando pgavatar`)
        .setTitle('Sintassi:\n **' + config.prefix + 'pgavatar** [Opzione][ID_Scheda]');
    message.channel.send(Container);
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbyid(id_serach);
    } else {
        return 1;
    }
    return cursor;
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}