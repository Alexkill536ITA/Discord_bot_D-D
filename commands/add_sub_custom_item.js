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
    name: 'pgcustom',
    description: "Aggiungi o togli oggetto custom",
    async execute(client, message, args) {
        if (config.Debug_Level == "DEBUG") {
            console.log('[ ' + color.cyan('DEBUG') + ' ] Event Execute add_sub_custom_item');
        }
        var Container = new Discord.MessageEmbed();
        let myRole = message.guild.roles.cache.find(role => role.name === config.role_avance);
        if (message.member.roles.cache.some(r => config.role_avance.includes(r.name)) || message.author.id == config.owner) {
            var colrs_set = clor_gen.rand_Color();
            var nome;
            var stp = 1;
            if (args[1].length == 24) {
                if (!isNaN(parseInt(args[2]))) {
                    for (let i = 4; i < args.length; i++) {
                        if (stp == 1) {
                            nome = args[i];
                            stp = 0;
                        } else {
                            nome += " " + args[i];
                        }
                    }
                    nome = String(nome).toLowerCase();

                    if (args[3] == "Si" || args[3] == "si" || args[3] == "SI") {
                        sinc = 1;
                    } else if (args[3] == "No" || args[3] == "no" || args[3] == "NO") {
                        sinc = 0;
                    } else {
                        emit_print(message);
                        return 1;
                    }

                    var Scheda = await get_Scheda_pg(args[1]);
                    var Scheda_PG = Scheda[0];
                    if (Scheda_PG == 1) {
                        Container.setColor([255, 0, 0])
                            .setAuthor(`Richiesta di: ${message.author.username}`)
                            .setTitle('Errore Scheda PG non trovata');
                        message.channel.send(Container);
                        return 1;
                    }

                    if (args[0] == "add" || args[0] == "-a") {
                        var inventory = Scheda_PG['Inventory'];
                        var check_nam = inventory[nome];
                        if (check_nam !== undefined) {
                            var num = parseInt(inventory[nome]['Quantita']);
                            num = num + parseInt(args[2]);
                            inventory[nome]['Quantita'] = num;
                        } else {
                            var oggetto = {};
                            var ogg_temp = {};
                            ogg_temp['Nome'] = nome;
                            ogg_temp['Quantita'] = parseInt(args[2]);
                            ogg_temp['Sincronia'] = sinc;
                            oggetto[nome] = ogg_temp;
                            Object.assign(inventory, oggetto);
                        }
                        methodDB.settab_db("Schede_PG");
                        methodDB.inventory_update(args[1], inventory);
                        // let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
                        Container = new Discord.MessageEmbed();
                        Container.setColor(colrs_set)
                            .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                            // .setThumbnail(member.user.displayAvatarURL(),true)
                            .addField("Nome", nome)
                            .addField("Quantità", args[2])
                            .addField("Sincronia", args[3])
                            .setTimestamp()
                            .setFooter("Data", message.author.displayAvatarURL());
                        message.channel.send(Container);
                    } else if (args[0] == "sub" || args[0] == "-s") {
                        var inventory = Scheda_PG['Inventory'];
                        var check_nam = inventory[nome];
                        if (check_nam !== undefined) {
                            num = num - parseInt(args[2]);
                            if (num <= 0 || isNaN(num) == true) {
                                var num_memory = "Non possiede più l'oggetto";
                                // let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
                                Container.setColor(colrs_set)
                                    .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                                    // .setThumbnail(member.user.displayAvatarURL(),true)
                                    .addField("Nome", nome)
                                    .addField("Quantità", num_memory)
                                    .addField("Sincronia", inventory[nome]['Sincronia'])
                                    .setTimestamp()
                                    .setFooter("Data", message.author.displayAvatarURL());
                                delete inventory[nome];
                            } else {
                                inventory[nome]['Quantita'] = num;
                                var num_memory = inventory[nome]['Quantita'];
                                // let member = message.guild.members.cache.get(Scheda_PG.Nome_Discord);
                                Container.setColor(colrs_set)
                                    .setTitle('Scheda: ' + Scheda_PG.Nome_PG)
                                    // .setThumbnail(member.user.displayAvatarURL(),true)
                                    .addField("Nome", nome)
                                    .addField("Quantità", num_memory)
                                    .addField("Sincronia", inventory[nome]['Sincronia'])
                                    .setTimestamp()
                                    .setFooter("Data", message.author.displayAvatarURL());    
                            }
                            methodDB.inventory_update(args[1], inventory);
                            message.channel.send(Container);
                        } else {
                            Container = new Discord.MessageEmbed();
                            Container.setColor([255, 0, 0])
                                .setAuthor(`Ogetto non rovato: ` + message.author.username)
                                .setTitle('Ogetto non è prensente nel\'inventario');
                            message.channel.send(Container);
                        }
                    } else {
                        emit_print(message);
                        return 1;
                    }
                } else {
                    emit_print(message);
                    return 1;
                }
            } else {
                emit_print(message);
                return 1;
            }
        } else {
            Container.setColor([255, 0, 0])
                .setAuthor(`🚫 Access denied ` + message.author.username + " 🚫")
                .setTitle('Non sei autorizzato a usare questo comando');
            message.channel.send(Container);
        }
    }
}

function emit_print(message) {
    var Container = new Discord.MessageEmbed();
    Container.setColor([255, 0, 0])
        .setAuthor(`Comando pgoggetto`)
        .setTitle('Sintassi:\n **' + config.prefix + 'pgoggetto** [Opzione][ID_Scheda][Quantità][Sincronia][Nome oggetto]');
    message.channel.send(Container);
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
