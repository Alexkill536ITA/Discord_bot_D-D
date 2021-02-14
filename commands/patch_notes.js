/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const globals_var = require('../script/globals_var.js');
const config = require("../config.json");
const vers = require("../CheckSum.json");
const color = require("ansi-colors");
const { version, versions } = require("process");

module.exports = {
    name: 'patchnotes',
    description: "Patch Notes",
    async execute(client, message, args){
        if (config.Debug_Level == "DEBUG") {
            console.log('[ '+color.cyan('DEBUG')+' ] Event Execute get_help');
        }
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        Container.setColor([255, 0, 0])
                .setTitle('Patch Notes')
                .setDescription('Patch Notes Version: '+vers.Create.Version+' Data: 13/02/2021')
                .addField('Aggunte Nuove', "• Aggiunto sitema per **Password Dimenticata** \n Valido Lato Web e BOT")
                .addField('Fix Bug Minori', '• Correzione di testi e errori di aspetto grafico \n Valido Lato Web e BOT')
                .setThumbnail(botavatar.displayAvatarURL())
                .setFooter("Bot by Alexkill ITA#3593                                                                                                Version "+vers.Create.Version, "https://cdn.discordapp.com/avatars/188587744140853251/7b4f42c2dd6de8acf3dccfc694e35b9f.webp");
        message.channel.send(Container);
    }
}