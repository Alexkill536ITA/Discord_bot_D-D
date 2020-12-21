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

module.exports = {
    name: 'math',
    description: "Calculator",
    async execute(client, message, args){
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == "Infinity Dice");
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if(message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0]) {
                var check = Check_Num(args[0]);
                if (check == true) {
                    var result = eval(args[0]);
                    Container.setColor(colrs_set)
                        .setTitle('Calcolatrice')
                        .setThumbnail(botavatar.displayAvatarURL())
                        .addField("Risultato", args[0]+" = ```"+result+"```");
                    message.channel.send(Container);
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Calcolatrice`)
                        .setTitle('Sintassi **'+config.prefix+'math** Es:[2+2*5-10/2]');        
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`Calcolatrice`)
                    .setTitle('Sintassi **'+config.prefix+'math** Es:[2+2*5-10/2]');        
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

function Check_Num(string_exspers) {
    var i = string_exspers.length;
    var ch = string_exspers.charAt(i-1);
    if (ch == "/" || ch == "*" || ch == "+" || ch == "-" || ch == "." || ch == "(" || ch == "%") {
        return false;
    }
    return true;
}