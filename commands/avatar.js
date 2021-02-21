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
    name: 'avatar',
    description: "get avatar",
    execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute get_avatar');
        }
        const Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0]) {
                const user = message.mentions.users.first();
                Container.setColor(colrs_set)
                    .setTitle('Avatar di: ' + user.username)
                    .setTimestamp()
                    .setFooter("Data", message.author.displayAvatarURL())
                    .setImage(user.displayAvatarURL({ dynamic: true }));
                message.reply(Container);
            } else {
                Container.setColor(colrs_set)
                    .setTitle('Avatar di: ' + message.author.username)
                    .setTimestamp()
                    .setFooter("Data", message.author.displayAvatarURL())
                    .setImage(message.author.displayAvatarURL({ dynamic: true }));
                message.reply(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
}