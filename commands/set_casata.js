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
    name: 'pgcasata',
    description: "Seleziona Casata",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute set_casata');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        try {
            if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
                var colrs_set = clor_gen.rand_Color();
                if (args[0]) {
                    var autore = message.mentions.users.first();
                    if (args[1]) {
                        var nome = args[1];
                        if (args.length > 2) {
                            for (let index = 1; index < args.length; index++) {
                                nome += " " + args[index];
                            }
                            nome = String(nome).toLowerCase();
                        }
                        if (config.list_casate.includes(nome)) {
                            var Scheda = await get_Scheda_pg(autore.id);
                            if (Scheda != null) {
                                methodDB.casata_update(Scheda._id, capitalizeFirstLetter(nome))
                                if (Scheda.Avatar == "Non Assegnata" || Scheda.Avatar == undefined) {
                                    var avatar = autore.displayAvatarURL();
                                } else {
                                    var avatar = Scheda.Avatar;
                                }
                                Container = new Discord.MessageEmbed();
                                Container.setColor(colrs_set)
                                    .setTitle('Scheda: ' + Scheda.Nome_PG)
                                    .setDescription("Ora fai parte della casata " + nome)
                                    .setThumbnail(avatar, true)
                                    .addField("Casata", nome)
                                    .setTimestamp()
                                    .setFooter("Data", message.author.displayAvatarURL());
                                message.channel.send(Container);
                            } else {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Richiesta di: ${message.author.username}`)
                                    .setTitle('Errore Scheda PG non trovata');
                                message.channel.send(Container);
                                return 1;
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
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autorizzato a usare questo comando');
                message.channel.send(Container);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    message_casata = ""
    for (index of config.list_casate) {
        message_casata = message_casata + "• " + index + "\n"
    }
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando pgcasata`)
        // .setTitle('Sintassi:\n **' + config.prefix + 'pgcasata** [@utente][Nome casata]');
        .setTitle('Sintassi:\n **' + config.prefix + 'pgcasata** [@utente][Nome casata]')
        .addField('Lista Casate', message_casata);
    message.channel.send(Container);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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