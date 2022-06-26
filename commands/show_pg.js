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
    name: 'pg',
    description: "motra pg",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute show_pg');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.id === config.role_base);
        try {
            if (message.member.roles.cache.some(r => config.role_base.includes(r.id)) || message.author.id == config.owner) {
                var colrs_set = clor_gen.rand_Color();
                if (args[0]) {
                    var autore = message.mentions.users.first();
                    try {
                        // if (args[1] && args[1].length == 24) {
                        var on_sevice_db = await methodDB.open_db();
                        if (on_sevice_db != 1) {
                            // var id_discord = args[1].replace('<@!', '');
                            // id_discord = id_discord.replace('>', '');
                            methodDB.settab_db("Schede_PG");
                            // const cursor = methodDB.load_pg(autore.id, id_discord);
                            const cursor = methodDB.load_pg(autore.id);
                            cursor.then(async function (result) {
                                if (result != null) {
                                    var js_result = await JSON.stringify(result);
                                    js_result = await JSON.parse(js_result);
                                    if (js_result['Avatar'] == "Non Assegnata" || js_result['Avatar'] == undefined) {
                                        var avatar = autore.displayAvatarURL();
                                    } else {
                                        var avatar = js_result['Avatar'];
                                    }
                                    Container = new Discord.MessageEmbed();
                                    Container.setColor(colrs_set)
                                        .setTitle('📜 Scheda PG: ' + autore.username)
                                        .setThumbnail(avatar, true)
                                        .addField("🆔 Scheda", js_result['_id'])
                                        .addField("Livello", js_result['Livello'], true)
                                        .addField("Milestone", js_result['Exp'], true);
                                    try {
                                       Container.addField("Frammenti", js_result['Pbc_frag']['Frammento'], true); 
                                    } catch (error) {
                                        Container.addField("Frammenti", 0, true); 
                                    }
                                    Container.addField('\u200b', '📝 **Anagrafe:**')
                                        .addField("Nome", js_result['Nome_PG'], true)
                                        .addField("Razza", js_result['Razza'], true)
                                        .addField("Classe", js_result['Classe'], true)
                                        .addField("Sotto Classe", js_result['Sotto Classe'], true)
                                        .addField("Multi Classe", js_result['Multi Classe'], true)
                                        .addField("Multi Sotto Classe", js_result['Multi Sotto Classe'], true)
                                        .addField("Background", js_result['Background'], true)
                                        .addField("Casata", js_result['Casata'], true)
                                        .addField("Grado Casata", getgrado(js_result['Casata'], js_result['Punti_Fama']), true)
                                        .addField('\u200b', '**Statistiche:**')
                                        .addField("💪 Forza", js_result['Forza'], true)
                                        .addField("🤸‍♂️ Destrezza", js_result['Destrezza'], true)
                                        .addField("🛡 Costituzione", js_result['Costituzione'], true)
                                        .addField("🧠 Intelligenza", js_result['Intelligenza'], true)
                                        .addField("📚 Saggezza", js_result['Saggezza'], true)
                                        .addField("🎭 Carisma", js_result['Carisma'], true)
                                        .addField("💰 Money", js_result['Money']);
                                    // Campo libero 23
                                    // Campo libero 24
                                    // Campo libero 25
                                    message.channel.send(Container)
                                } else {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Scheda non trovata');
                                    message.channel.send(Container);
                                }
                            });
                        }
                    } catch {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Comando PG`)
                            // .setTitle('Sintassi **' + config.prefix + 'pg** [@utente][ID_Scheda]');
                            .setTitle('Sintassi **' + config.prefix + 'pg** [@utente]');
                        message.channel.send(Container);
                    }
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando PG`)
                        .setTitle('Sintassi **' + config.prefix + 'pg** [@utente]');
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autorizzato a usare questo comando');
                message.channel.send(Container);
            }
        } catch (error) {
            if (message.author.bot) {
                message.delete()
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

function getgrado(casata, punti) {
    casata = casata.toLowerCase();
    var gradi = config.list_gradi[casata];
    for (const key in gradi) {
        if (punti >= gradi[key]['value_min'] && punti <= gradi[key]['value_max']) {
            return gradi[key]['name'];
        }
    }
}