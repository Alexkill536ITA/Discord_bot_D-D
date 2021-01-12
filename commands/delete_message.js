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
    name: 'clearchat',
    description: "Delete Message chat",
    execute(client, message, args){
        if (config.Debug_Level == "DEBUG") {
            console.log('[ '+color.cyan('DEBUG')+' ] Event Execute delete_message');
        }
        var Container = new Discord.MessageEmbed();
        let botavatar = client.users.cache.find(user => user.username == config.Nickname_Bot);
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_admin);
        if(message.member.roles.cache.some(r => config.role_admin.includes(r.name)) || message.author.id == config.owner) {
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (args[0] == "all" || args[0] == "-a") {
                    async function clear() {
                        message.delete();
                        const fetched = await message.channel.messages.fetch({limit: 99});
                        message.channel.bulkDelete(fetched);
                    }
                    clear();
                    
                    Container.setColor([255, 0, 0])
                        .setAuthor("Help Generale")
                        .setThumbnail(botavatar.displayAvatarURL())
                        .setDescription("Il link contine la presentazione di come ci si deve registrare")
                        .addField("Link","https://docs.google.com/presentation/d/1O0cqPF469j_96wPvb0DAX3DP8YY4_FLCspZy4y296Zc/edit?usp=sharing");
                    message.channel.send(Container);

                    client.commands.get('help').execute(client, message, args);
                } else if (parseInt(args[0]) > 0) {
                    if (parseInt(args[0]) > 99) {
                        num_int = parseInt(args[0]);
                        num = 99;
                        do {
                            message.channel.bulkDelete(num);
                            num_int = num_int - num;
                            nun = num_int;
                        } while (num_int > 0);
                    } else {
                        message.channel.bulkDelete(args[0]); 
                    }
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando clearchat`)
                        .setTitle('Sintassi **'+config.prefix+'clearchat** [Opzione/Valore]');
                    message.channel.send(Container);
                }              
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`🚫 ERRORE Permesso negato 🚫`)
                    .setTitle('Il BOT Non è autorizato a eliminare i messaggi');   
                message.channel.send(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied `+message.author.username+" 🚫")
                .setTitle('Non sei autoriazato a usare questo comando');   
            message.channel.send(Container);
        }
    }
}