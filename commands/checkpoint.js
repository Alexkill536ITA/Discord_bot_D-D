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
    name: 'checkpoint',
    description: "checkpoint Scheda",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute Checkpoint');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[1].length == 24) {
                if (args[0] == 1) {
                    add_money(args[1], 12, 500);
                    Manager_role_level(message, args[1], config.Level["Bronzo"]);
                } else if (args[0] == 2) {
                    add_money(args[1], 42, 750);
                    Manager_role_level(message, args[1], config.Level["Argento"]);
                } else if (args[0] == 3) {
                    add_money(args[1], 83,1000);
                    Manager_role_level(message, args[1], config.Level["Oro"]);
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
        .setTitle('Sintassi **' + config.prefix + 'checkpoint** [Opzione][ID_Scheda]');
    message.channel.send(Container);
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

function add_money(id_Scheda, exe, value) {
    var colrs_set = clor_gen.rand_Color();
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbyid(id_Scheda);
        cursor.then(function (result) {
            if (result != null) {
                var old_value_mo = result[0].Money;
                var new_value_mo = old_value_mo + value;
                methodDB.exp_update(result[0]._id, exe);
                methodDB.money_update(result[0]._id, new_value_mo);
                let member = message.guild.members.cache.get(result[0].Nome_Discord);
                Container = new Discord.MessageEmbed();
                Container.setColor(colrs_set)
                    .setTitle('Checkpoint Scheda: ' + result[0].Nome_PG)
                    .setThumbnail(member.user.displayAvatarURL(), true)
                    .addField("Milestone: ", new_value_exe)
                    .addField("Money", new_value_mo)
                    .setTimestamp()
                    .setFooter("Data", message.author.displayAvatarURL());
                message.channel.send(Container);
            }
        });
    }
}