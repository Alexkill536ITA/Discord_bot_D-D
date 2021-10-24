/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const Discord = require('discord.js');
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'ping',
    description: "ping Bot",
    execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute Ping');
        }
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        try {
            if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
                var colrs_set = clor_gen.rand_Color();
                Container.setColor(colrs_set)
                    .setTitle('Ping BOT')
                    .setThumbnail(botavatar.displayAvatarURL())
                    .addField("Ping:", `\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\``, true)
                    .addField("Websocket API:", `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``, true);
                message.channel.send(Container);
                if (args[0] == "-t") {
                    for (let index = 0; index < 3; index++) {
                        var Container = new Discord.MessageEmbed();
                        Container.setColor(colrs_set)
                            .setTitle('Ping BOT')
                            .setThumbnail(botavatar.displayAvatarURL())
                            .addField("Ping:", `\`\`\`${Date.now() - message.createdTimestamp}ms\`\`\``, true)
                            .addField("Websocket API:", `\`\`\`${Math.round(client.ws.ping)}ms\`\`\``, true);
                        message.channel.send(Container);
                    }
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