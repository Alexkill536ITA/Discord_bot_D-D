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
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[2] && args[2].length == 24) {
                if (isNaN(parseInt(args[1])) == false) {
                    if (args[0] == "forza") {
                        update_stats(message, args[2], "Forza", args[1]);
                    } else if (args[0] == "destrezza") {
                        update_stats(message, args[2], "Destrezza", args[1]);
                    } else if (args[0] == "costituzione") {
                        update_stats(message, args[2], "Costituzione", args[1]);
                    } else if (args[0] == "intelligenza") {
                        update_stats(message, args[2], "Intelligenza", args[1]);
                    } else if (args[0] == "saggezza") {
                        update_stats(message, args[2], "Saggezza", args[1]);
                    } else if (args[0] == "carisma") {
                        update_stats(message, args[2], "Carisma", args[1]);
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
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando Checkpoint`)
        .setTitle('Sintassi **' + config.prefix + 'statsset** [Opzione][Valore][ID_Scheda]');
    message.channel.send(Container);
}

async function update_stats(message, id_Scheda, filter, value) {
    var colrs_set = clor_gen.rand_Color();
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbyid(id_Scheda);
        cursor.then(function (result) {
            if (result != null && result != []) {
                var query = {};
                query[filter] = parseInt(value);
                methodDB.stats_update(result[0]._id, query);
                let member = message.guild.members.cache.get(result[0].Nome_Discord);
                var Container = new Discord.MessageEmbed();
                Container.setColor(colrs_set)
                    .setTitle('Stats Scheda: ' + result[0].Nome_PG)
                    .setThumbnail(member.user.displayAvatarURL(), true)
                    .addField(filter + ": ", value)
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