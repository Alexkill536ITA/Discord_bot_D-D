/**----------------------------------------------------**\
**       Programma Svilupato Da Alexkilll536ITA        **|
**       Data Di Realizazione V1 il: 10/10/2020        **|
*! É Vietata Disribuzione Fuori Dai Termini Di Licenza **|
*?       Prodotto Registrato sotto Bjarka Energy®      **|
\**----------------------------------------------------**/

const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.json");
const DiceRoller = require('roll-dice');
let diceRoller = new DiceRoller();

module.exports = {
    name: 'roll',
    description: "rolla dadi",
    async execute(client, message, args){
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == "Infinity Dice");
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if(message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            if (args[0]) {
                var result = diceRoller.roll(args[0]);
                if (result['result'] !== undefined) {
                    Container.setColor([255, 0, 0])
                        .setTitle('Roll dice')
                        .setThumbnail(botavatar.displayAvatarURL())
                        .addField("Risultato", args[0]+" = ```"+result['result']+"```");
                    message.reply(" ");
                    message.channel.send(Container);
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando Roll`)
                        .setTitle('Sintassi **&roll** Es:[1d20+5]');
                    message.reply(" ");   
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`Comando Roll`)
                    .setTitle('Sintassi **&roll** Es:[1d20+5]');        
                message.channel.send(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}