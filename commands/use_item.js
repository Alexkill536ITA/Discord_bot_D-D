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
const config = require("../config.json");
const clor_gen = require("../script/color_gen.js");
const color = require("ansi-colors");

module.exports = {
    name: 'consuma',
    description: "Consuma oggetto",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute consuma oggetto');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_base);
        if (message.member.roles.cache.some(r => config.role_base.includes(r.name)) || message.author.id == config.owner) {
            if (String(args[0]).length == 24 && args[1] && args[2]) {
                if (isNaN(parseInt(args[1])) == false) {
                    var nome = args[2];
                    if (args.length > 3) {
                        for (let index = 3; index < args.length; index++) {
                            nome += " " + args[index];
                        }
                    }
                    nome = String(nome).toLowerCase();
                    var cursor = get_Scheda_pg(args[0]);
                    if (cursor != null && cursor != 1) {
                        cursor.then(function (result) {
                            var Scheda_PG = result[0]
                            if (message.author.id == Scheda_PG['Nome_Discord']) {
                                var inventory = Scheda_PG['Inventory'];
                                var check_nam = inventory[nome];
                                if (check_nam !== undefined) {
                                    var num = parseInt(inventory[nome]['Quantita']);
                                    num = num - parseInt(args[1]);
                                    if (num <= 0 || isNaN(num) == true) {
                                        var num_memory = "Non possiede più l'oggetto";
                                        let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
                                        if (Scheda_PG['Avatar'] == "Non Assegnata" || Scheda_PG['Avatar'] == undefined) {
                                            var avatar = member.user.displayAvatarURL();
                                        } else {
                                            var avatar = Scheda_PG['Avatar'];
                                        };
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(clor_gen.rand_Color())
                                            .setTitle('Scheda: ' + Scheda_PG['Nome_PG'])
                                            .setThumbnail(Avatar,true)
                                            .addField("Nome", nome)
                                            .addField("Quantità", num_memory)
                                            .addField("Sincronia", inventory[nome]['Sincronia'])
                                            .setTimestamp()
                                            .setFooter("Data", message.author.displayAvatarURL());
                                        delete inventory[nome];
                                    } else {
                                        inventory[nome]['Quantita'] = num;
                                        var num_memory = inventory[nome]['Quantita'];
                                        let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
                                        if (Scheda_PG['Avatar'] == "Non Assegnata" || Scheda_PG['Avatar'] == undefined) {
                                            var avatar = member.user.displayAvatarURL();
                                        } else {
                                            var avatar = Scheda_PG['Avatar'];
                                        };
                                        Container = new Discord.MessageEmbed();
                                        Container.setColor(clor_gen.rand_Color())
                                            .setTitle('Scheda: ' + Scheda_PG['Nome_PG'])
                                            .setThumbnail(avatar, true)
                                            .addField("Nome", nome)
                                            .addField("Quantità", num_memory)
                                            .addField("Sincronia", inventory[nome]['Sincronia'])
                                            .setTimestamp()
                                            .setFooter("Data", message.author.displayAvatarURL());
                                    }
                                    methodDB.inventory_update(args[0], inventory);
                                    message.channel.send(Container);
                                } else {
                                    Container.setColor([255, 0, 0])
                                        .setAuthor(`Richiesta di: ${message.author.username}`)
                                        .setTitle('Errore Oggetto non trovat0');
                                    message.channel.send(Container);
                                    return 1;
                                }
                            } else {
                                Container.setColor([255, 0, 0])
                                    .setAuthor(`Utenete non valido: ` + message.author.username)
                                    .setTitle('Non puoi spacciarti per un altro');
                                message.channel.send(Container);
                                return 1;
                            }
                        });
                    } else {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Richiesta di: ${message.author.username}`)
                            .setTitle('Errore Scheda PG non trovata');
                        message.channel.send(Container);
                        return 1;
                    }
                } else {
                    Container.setColor([255, 0, 0])
                        .setAuthor(`Comando pgoggetto`)
                        .setTitle('Sintassi:\n **' + config.prefix + 'consuma** [ID_Scheda][Quantità][Nome oggetto]');
                    message.channel.send(Container);
                }
            } else {
                Container.setColor([255, 0, 0])
                    .setAuthor(`Comando pgoggetto`)
                    .setTitle('Sintassi:\n **' + config.prefix + 'consuma** [ID_Scheda][Quantità][Nome oggetto]');
                message.channel.send(Container);
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
}

async function get_Scheda_pg(id_serach) {
    var on_sevice_db = await methodDB.open_db();
    if (on_sevice_db != 1) {
        methodDB.settab_db("Schede_PG");
        var cursor = methodDB.serachbyid(id_serach);
    } else {
        return 1;
    }
    return cursor;
}