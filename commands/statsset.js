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
    name: 'statsset',
    description: "Modifica statistiche",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute add_sub_exp');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.id === config.role_avance);
        try {
            if (message.member.roles.cache.some(r => config.role_avance.includes(r.id)) || message.author.id == config.owner) {
                var colrs_set = clor_gen.rand_Color();
                // if (args[2] && args[2].length == 24) {
                var autore = message.mentions.users.first();
                try {
                    if (isNaN(parseInt(args[1])) == false) {
                        var options = args[0].toLowerCase();
                        if (options == "forza") {
                            update_stats(message, autore.id, "💪 Forza", "Forza", args[1]);
                        } else if (options == "destrezza") {
                            update_stats(message, autore.id, "🤸‍♂️ Destrezza", "Destrezza", args[1]);
                        } else if (options == "costituzione") {
                            update_stats(message, autore.id, "🛡 Costituzione", "Costituzione", args[1]);
                        } else if (options == "intelligenza") {
                            update_stats(message, autore.id, "🧠 Intelligenza", "Intelligenza", args[1]);
                        } else if (options == "saggezza") {
                            update_stats(message, autore.id, "📚 Saggezza", "Saggezza", args[1]);
                        } else if (options == "carisma") {
                            update_stats(message, autore.id, "🎭 Carisma", "Carisma", args[1]);
                        } else {
                            emit_print(message);
                        }
                    } else {
                        emit_print(message);
                    }
                } catch {
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

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Checkpoint`)
        // .setTitle('Sintassi **' + config.prefix + 'statsset** [Opzione][Valore][ID_Scheda]');
        .setTitle('Sintassi **' + config.prefix + 'statsset** [Opzione][Valore][@utente]');
    message.channel.send(Container);
}

async function update_stats(message, id_Scheda, str_flt, filter, value) {
    var colrs_set = clor_gen.rand_Color();
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        // var cursor = methodDB.serachbyid(id_Scheda);
        var cursor = methodDB.load_pg(id_Scheda);
        cursor.then(function (result) {
            if (result != null && result != []) {
                var query = {};
                query[filter] = parseInt(value);
                // methodDB.stats_update(result[0]._id, query);
                methodDB.stats_update(result._id, query);
                // let member = message.guild.members.cache.get(result[0].Nome_Discord);
                let member = message.guild.members.cache.get(result.Nome_Discord);
                // if (result[0].Avatar == "Non Assegnata" || result[0].Avatar == undefined) {
                if (result.Avatar == "Non Assegnata" || result.Avatar == undefined) {
                    var avatar = member.user.displayAvatarURL();
                } else {
                    var avatar = result.Avatar;
                    var avatar = result.Avatar;
                }
                var Container = new Discord.MessageEmbed();
                Container.setColor(colrs_set)
                    // .setTitle('📜 Stats Scheda: ' + result[0].Nome_PG)
                    .setTitle('📜 Stats Scheda: ' + result.Nome_PG)
                    .setThumbnail(avatar, true)
                    .addField(str_flt + ": ", value)
                    .setTimestamp()
                    .setFooter("Data", message.author.displayAvatarURL());
                message.channel.send(Container);
            } else {
                var Container = new Discord.MessageEmbed();
                Container.setColor([255, 0, 0])
                    .setAuthor(`Richiesta di: ${message.author.username}`)
                    .setTitle('Errore Scheda non trovata');
                message.channel.send(Container);
            }
        });
    }
}