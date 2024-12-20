/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");
const color = require("ansi-colors");

module.exports = {
    name: 'register',
    description: "Show help register",
    execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute show_register_link');
        }
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        let myRole = message.guild.roles.cache.find(role => role.id === config.role_base);
        try {
            if (message.member.roles.cache.some(r => config.role_base.includes(r.id)) || message.author.id == config.owner) {
                Container.setColor([255, 0, 0])
                    .setAuthor("Help Generale")
                    .setThumbnail(botavatar.displayAvatarURL())
                    .setDescription("Il link contine la presentazione di come ci si deve registrare")
                    .addField("Link", "https://docs.google.com/presentation/d/1O0cqPF469j_96wPvb0DAX3DP8YY4_FLCspZy4y296Zc/edit?usp=sharing");
                message.channel.send(Container);
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                    .setTitle('Non sei autoriazato a usare questo comando');
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