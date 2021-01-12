/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");
const setconfig = require("../tools/Confing_edit.js");
const color = require("ansi-colors");

module.exports = {
    name: 'restart',
    description: "Restart Bot",
    async execute(client,message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ '+color.cyan('DEBUG')+' ] Event Execute set_config');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_admin);
        if(message.author.id == config.owner) {
            Container.setColor([255, 0, 0])
            .setAuthor("Restart Bot")
            .setDescription("Restart Bot...")
            await message.channel.send(Container);
            console.log('[ '+color.blue('INFO')+'  ] Restart Bot...')
            process.exit();
        }
    }
}