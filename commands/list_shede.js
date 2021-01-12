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
const Pagination = require('discord-paginationembed');
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'pglist',
    description: "Lista Personaggi",
    async execute(message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ '+color.cyan('DEBUG')+' ] Event Execute get_list_schedule');
        }
        var Container = new Discord.MessageEmbed();
        // let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if(message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            if (args[0]) {
                var autore = message.mentions.users.first();
                var id_discord = args[0].replace('<', '');
                id_discord = id_discord.replace('@', '');
                id_discord = id_discord.replace('!', '');
                id_discord = id_discord.replace('>', '');
                var on_sevice_db = await methodDB.open_db();
                if (on_sevice_db != 1) {
                    methodDB.settab_db("Schede_PG");
                    var cursor = methodDB.serachbylistpg(id_discord);
                    cursor.then(function(result) {
                        if (result.length != 0) {
                            if (result.length >= 2) {
                                const embeds = [];
                                for (let i=0; i <= result.length; i++) {
                                    embeds.push(new Discord.MessageEmbed().addField('Pagine', i, true));
                                }
                                const Embeds = new Pagination.Embeds()
                                    .setArray(embeds)
                                    .setAuthorizedUsers([message.author.id])
                                    .setChannel(message.channel)
                                    .setPageIndicator(false)
                                    .setColor(colrs_set)
                                    .setTitle('Lista Schada PG: '+ autore.username)
                                    .setThumbnail(autore.displayAvatarURL(),true)
                                    .addField("N:", result.length,true)
                                    .addField('\u200b', '\u200b')
                                    .addField("ID Scheda",result[0]._id,true)
                                    .addField("Nome PG",result[0].Nome_PG,true)
                                    .setDisabledNavigationEmojis(['all'])
                                    .setDeleteOnTimeout(false)
                                    .setFunctionEmojis({
                                        '◀️': (_, instance) => {
                                            for (const embed of instance.array) {
                                                var e = embed.fields[0].value;
                                                e--;
                                                if (e >= 0) {
                                                    embed.fields[0].value = e;
                                                    embed.fields[3].value = result[e]._id;
                                                    embed.fields[4].value = result[e].Nome_PG;
                                                }
                                            }
                                        },
                                        '▶️': (_, instance) => {
                                            for (const embed of instance.array) {
                                                var e = embed.fields[0].value;
                                                e++;
                                                if (e < embed.fields[1].value) {
                                                    embed.fields[0].value = e;
                                                    embed.fields[3].value = result[e]._id;
                                                    embed.fields[4].value = result[e].Nome_PG;
                                                }
                                            }
                                        }
                                    });
                                Embeds.build();
                            } else {
                                Container = new Discord.MessageEmbed();
                                Container.setColor(colrs_set)
                                    .setTitle('Lista Schede PG: '+ autore.username)
                                    .setThumbnail(autore.displayAvatarURL(),true)
                                    .addField("ID Scheda",result[0]._id)
                                    .addField("Nome",result[0].Nome_PG,);
                                message.channel.send(Container);
                            }
                        } else {
                            Container = new Discord.MessageEmbed();
                            Container.setColor([255, 0, 0])
                                .setAuthor(`Richiesta di: ${message.author.username}`)
                                .setTitle('Errore Utente non trovato');   
                            message.channel.send(Container);
                        }
                    });
                }
            } else {
                Container = new Discord.MessageEmbed();
                Container.setColor([255, 0, 0])
                    .setAuthor(`Comando pglist`)
                    .setTitle('Sintassi **'+config.prefix+'pglist** [@utente]');   
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
