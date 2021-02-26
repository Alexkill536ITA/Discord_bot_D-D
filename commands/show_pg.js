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
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0]) {
                var autore = message.mentions.users.first();
                if (args[1] && args[1].length == 24) {
                    var on_sevice_db = await methodDB.open_db();
                    if (on_sevice_db != 1) {
                        var id_discord = args[1].replace('<@!', '');
                        id_discord = id_discord.replace('>', '');
                        methodDB.settab_db("Schede_PG");
                        const cursor = methodDB.load_pg(autore.id, id_discord);
                        cursor.then(function (result) {
                            if (result != null) {
                                var js_result = JSON.stringify(result);
                                js_result = JSON.parse(js_result);
                                Container = new Discord.MessageEmbed();
                                Container.setColor(colrs_set)
                                    .setTitle('Scheda PG: ' + autore.username)
                                    .setThumbnail(autore.displayAvatarURL(), true)
                                    .addField("ID Scheda", js_result['_id'])
                                    .addField("Livello", js_result['Livello'], true)
                                    .addField("Milestone", js_result['Exp'], true)
                                    .addField('\u200b', '\u200b')
                                    .addField("Nome", js_result['Nome_PG'], true)
                                    .addField("Razza", js_result['Razza'], true)
                                    .addField("Classe", js_result['Classe'], true)
                                    .addField("Sotto Classe", js_result['Sotto Classe'], true)
                                    .addField("Background", js_result['Background'], true)
                                    .addField("Money", js_result['Money']);
                                message.channel.send(Container)
                            } else {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Scheda non trovata');
                                message.channel.send(Container);
                            }
                        });
                    }
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando PG`)
                        .setTitle('Sintassi **' + config.prefix + 'pg** [@utente][ID_Scheda]');
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`Comando PG`)
                    .setTitle('Sintassi **' + config.prefix + 'pg** [@utente][ID_Scheda]');
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