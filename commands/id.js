/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'id',
    description: "get id user",
    execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute get_id');
        }
        var Container = new Discord.MessageEmbed();
        // let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        try {
            if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
                let myRole = message.guild.roles.cache.find(role => role.name === config.role_admin);
                if (message.member.roles.cache.some(r => config.role_admin.includes(r.name)) || message.author.id == config.owner) {
                    if (args[0]) {
                        var colrs_set = clor_gen.rand_Color();
                        var users_selt = getUserFromMention(client, args[0]);
                        Container.setColor(colrs_set).setTitle('ID Utente Discord').setDescription(users_selt.username + ": " + users_selt.id);
                        message.author.send(Container);
                        Container = new Discord.MessageEmbed();
                        Container.setColor(colrs_set)
                            .setTitle('Invio ID Utente Completato')
                            .setDescription(`🆔 Richiesta di: ${message.author.username}`)
                            .setTimestamp()
                            .setFooter("Data", message.author.displayAvatarURL())
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
                    } else {
                        var colrs_set = clor_gen.rand_Color();
                        Container.setColor(colrs_set).setTitle('Il Tuo ID Utente Discord').setDescription(message.author.username + ": " + message.author);
                        message.author.send(Container);
                        Container = new Discord.MessageEmbed();
                        Container.setColor(colrs_set)
                            .setTitle('Invio ID Utente Completato')
                            .setDescription(`🆔 Richiesta di: ${message.author.username}`)
                            .setTimestamp()
                            .setFooter("Data", message.author.displayAvatarURL())
                            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
                    }
                    message.channel.send(Container);
                } else {
                    var colrs_set = clor_gen.rand_Color();
                    Container.setColor(colrs_set).setTitle('Il Tuo ID Utente Discord').setDescription(message.author.username + ": " + message.author);
                    message.author.send(Container);
                    Container = new Discord.MessageEmbed();
                    Container.setColor(colrs_set)
                        .setTitle('Invio ID Utente Completato')
                        .setDescription(`🆔 Richiesta di: ${message.author.username}`)
                        .setTimestamp()
                        .setFooter("Data", message.author.displayAvatarURL())
                        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autoriazato a usare questo comando');
                message.channel.send(Container);
            }
        } catch (error) {
            if (message.author.bot) {
                message.delete();
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

function getUserFromMention(client, mention) {
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return client.users.cache.get(mention);
    }
}